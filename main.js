document.addEventListener('DOMContentLoaded', function () {
    // الحصول على العنصر الذي يحتوي على الرقم
    const numberElement = document.querySelector('.number');
    // الرقم النهائي الذي نريد الوصول إليه
    const targetNumber = parseInt(numberElement.textContent, 10);
    
    // دالة لتحديث الرقم تدريجياً
    function updateNumber() {
        const duration = 2000; // المدة الزمنية بالمللي ثانية (2 ثانية)
        const stepTime = 50; // الوقت بين كل تحديث والآخر بالمللي ثانية
        const steps = Math.ceil(duration / stepTime);
        const stepValue = targetNumber / steps;
        let currentNumber = 0;

        function incrementNumber() {
            currentNumber += stepValue;
            if (currentNumber >= targetNumber) {
                numberElement.textContent = targetNumber;
            } else {
                numberElement.textContent = Math.floor(currentNumber);
                setTimeout(incrementNumber, stepTime);
            }
        }

        incrementNumber();
    }

    // إعداد Intersection Observer لمراقبة القسم
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateNumber();
                observer.unobserve(entry.target); // إيقاف المراقبة بعد بدء العد
            }
        });
    }, {
        threshold: 0.5 // نسبة ظهور العنصر (50%) لتفعيل المؤقت
    });

    // ملاحظة العنصر الذي يحتوي على الرقم
    const sectionElement = document.querySelector('.join');
    observer.observe(sectionElement);
});


// الحصول على الأيقونة والقائمة
const toggleMenu = document.querySelector('.toggle-menu');
const navLinks = document.querySelector('nav ul');

// إضافة حدث click للأيقونة
toggleMenu.addEventListener('click', function() {
  // تبديل الصنف 'active' لإظهار أو إخفاء القائمة
  navLinks.classList.toggle('active');
});
