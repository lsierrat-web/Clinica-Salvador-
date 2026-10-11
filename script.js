document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Mapeo de Médicos por Especialidad
    const doctorsData = {
        'medicina-general': ['Dr. Juan Pérez', 'Dra. María López'],
        'cardiologia': ['Dr. Carlos Mendoza', 'Dr. Alejandro Ríos'],
        'pediatria': ['Dra. Elena Gómez', 'Dr. Roberto Torres'],
        'neurologia': ['Dr. Fernando Silva'],
        'odontologia': ['Dra. Sofia Martínez']
    };

    const especialidadSelect = document.getElementById('especialidad');
    const doctorSelect = document.getElementById('doctor');

    function updateDoctorSelect(specialtyValue, selectedDoctor = null) {
        doctorSelect.innerHTML = '';

        if (!specialtyValue || !doctorsData[specialtyValue]) {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Primero selecciona una especialidad';
            doctorSelect.appendChild(defaultOption);
            return;
        }

        const doctors = doctorsData[specialtyValue];
        doctors.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc;
            option.textContent = doc;
            if (selectedDoctor && doc === selectedDoctor) {
                option.selected = true;
            }
            doctorSelect.appendChild(option);
        });
    }

    especialidadSelect.addEventListener('change', (e) => {
        updateDoctorSelect(e.target.value);
    });

    // 3. Activar efecto Neón y desplegar doctores
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const header = card.querySelector('.card-header');
        const doctorsList = card.querySelector('.doctors-list');

        header.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-book-doc')) return;

            const isAlreadyActive = card.classList.contains('neon-active');

            serviceCards.forEach(c => {
                c.classList.remove('neon-active');
                const list = c.querySelector('.doctors-list');
                if (list) list.style.display = 'none';
            });

            if (!isAlreadyActive) {
                card.classList.add('neon-active');
                doctorsList.style.display = 'block';
            }
        });
    });

    // 4. Seleccionar doctor y desplazar al formulario
    document.querySelectorAll('.btn-book-doc').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const docName = button.getAttribute('data-doc');
            const specValue = button.getAttribute('data-spec');

            especialidadSelect.value = specValue;
            updateDoctorSelect(specValue, docName);

            document.getElementById('citas').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 5. Envío del Formulario
    const appointmentForm = document.getElementById('appointment-form');
    const formMessage = document.getElementById('form-message');

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const especialidadText = especialidadSelect.options[especialidadSelect.selectedIndex].text;
        const doctorText = doctorSelect.value;
        const fecha = document.getElementById('fecha').value;

        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        formMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i> ¡Gracias, <strong>${nombre}</strong>! Tu cita de <strong>${especialidadText}</strong> con el <strong>${doctorText}</strong> ha sido agendada para el <strong>${fecha}</strong> en <strong>Clínica Salvador</strong>.`;

        appointmentForm.reset();
        updateDoctorSelect('');

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 6000);
    });

    // 6. Restricción de fecha mínima
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', today);
    }
});