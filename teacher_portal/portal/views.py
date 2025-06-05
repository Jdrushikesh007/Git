from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_POST
from .models import Student
from .forms import StudentForm

@login_required
def student_list(request):
    students = Student.objects.all().order_by("name", "subject")
    return render(request, "portal/student_list.html", {"students": students})

@login_required
@require_POST
def add_student(request):
    form = StudentForm(request.POST)
    if form.is_valid():
        name = form.cleaned_data["name"]
        subject = form.cleaned_data["subject"]
        marks = form.cleaned_data["marks"]
        student, created = Student.objects.get_or_create(name=name, subject=subject, defaults={"marks": marks})
        if not created:
            student.marks += marks
            student.save()
        return JsonResponse({"success": True, "student_id": student.id, "created": created, "new_marks": student.marks})
    return JsonResponse({"success": False, "errors": form.errors}, status=400)

@login_required
@require_POST
def update_student(request, pk):
    student = get_object_or_404(Student, pk=pk)
    field = request.POST.get("field")
    value = request.POST.get("value")
    if field not in ["name", "subject", "marks"]:
        return HttpResponseBadRequest("Invalid field")
    setattr(student, field, value)
    student.save()
    return JsonResponse({"success": True})

@login_required
@require_POST
def delete_student(request, pk):
    student = get_object_or_404(Student, pk=pk)
    student.delete()
    return JsonResponse({"success": True})
