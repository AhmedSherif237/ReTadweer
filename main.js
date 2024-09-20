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


const slider = document.querySelector('.slider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = document.querySelectorAll('.dot');

let scrollAmount = 0;
const cardWidth = document.querySelector('.card').offsetWidth + 20; // عرض الكارت مع المسافة بين الكروت
let currentIndex = 0;

function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// التحقق مما إذا كان بإمكان السلايدر التمرير للأمام
nextBtn.addEventListener('click', () => {
    if (scrollAmount < slider.scrollWidth - slider.clientWidth) {
        scrollAmount += cardWidth;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth',
        });
        currentIndex = (currentIndex + 1) % dots.length;
        updateDots(currentIndex);
    }
});

// التحقق مما إذا كان بإمكان السلايدر التمرير للخلف
prevBtn.addEventListener('click', () => {
    if (scrollAmount > 0) {
        scrollAmount -= cardWidth;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth',
        });
        currentIndex = (currentIndex - 1 + dots.length) % dots.length;
        updateDots(currentIndex);
    }
});


document.getElementById('showFormBtn').onclick = function() {
    document.getElementById('formModal').style.display = 'block';
};

document.querySelector('.close-btn').onclick = function() {
    document.getElementById('formModal').style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == document.getElementById('formModal')) {
        document.getElementById('formModal').style.display = 'none';
    }
};


function closeModal() {
    document.getElementById('formModal').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // إظهار رسالة التأكيد
    document.getElementById('requestForm').style.display = 'none'; // إخفاء النموذج
    document.getElementById('confirmationMessage').style.display = 'block'; // إظهار الرسالة
}