// EmailJS initialisieren - WICHTIG: Verwenden Sie Ihren echten Public Key
emailjs.init('A4LQ30n-hoCmPTGWa'); // Ersetzen Sie mit Ihrem Public Key

const form = document.getElementById('reservationForm');
const submitBtn = document.getElementById('submitBtn');

document.addEventListener('DOMContentLoaded', function() {
    // Prüfen ob EmailJS geladen wurde
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS ist nicht geladen! Stellen Sie sicher, dass das Script eingebunden ist.');
        return;
    }

    const dateInput = document.querySelector('input[name="date"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    const form = document.getElementById('reservationForm');

    // Set minimum date to today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', formattedTomorrow);

    // Phone validation
    phoneInput.addEventListener('input', function(e) {
        const value = e.target.value;
        if (!/^[+0-9]*$/.test(value)) {
            e.target.value = value.replace(/[^+0-9]/g, '');
        }
        if (value.indexOf('+') > 0) {
            e.target.value = value.replace(/\+/g, '');
            if (!e.target.value.startsWith('+')) {
                e.target.value = '+' + e.target.value;
            }
        }
    });

    // Form submission mit verbessertem Debugging
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('Form wird abgeschickt...');
        
        // Check if selected date is in the past
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate < currentDate) {
            alert('Bitte wählen Sie ein Datum in der Zukunft.');
            return;
        }

        // Button deaktivieren und Loading-Zustand anzeigen
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span>Wird gesendet...';
        
        // Formulardaten sammeln
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Formulardaten:', data);
        
        // Template-Parameter vorbereiten
        const templateParams = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            location: data.location,
            date: data.date,
            time: data.time,
            guests: data.guests,
            occasion: data.occasion || 'Nicht angegeben',
            special_requests: data.special_requests || 'Keine besonderen Wünsche',
            reservation_time: new Date().toLocaleString('de-DE'),
            message: `
                Neue Reservierungsanfrage:
                
                Name: ${data.name}
                E-Mail: ${data.email}
                Telefon: ${data.phone}
                Standort: ${data.location}
                Datum: ${data.date}
                Uhrzeit: ${data.time}
                Anzahl Gäste: ${data.guests}
                Anlass: ${data.occasion || 'Nicht angegeben'}
                Spezielle Wünsche: ${data.special_requests || 'Keine besonderen Wünsche'}
            `
        };
        
        console.log('Template-Parameter:', templateParams);
        
        try {
            console.log('Sende E-Mail über EmailJS...');
            
            // E-Mail über EmailJS senden
            const response = await emailjs.send(
                'service_65cr488', // ÜBERPRÜFEN: Service ID
                'template_idcbhus', // ÜBERPRÜFEN: Template ID
                templateParams
            );
            
            console.log('EmailJS Antwort:', response);
            
            if (response.status === 200) {
                showNotification('Reservierung erfolgreich gesendet! Wir melden uns bald bei Ihnen.', 'success');
                form.reset();
                closeReservation();
            } else {
                throw new Error(`EmailJS returned status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Detaillierter Fehler beim Senden:', error);
            
            // Spezifische Fehlermeldungen
            let errorMessage = 'Fehler beim Senden der Reservierung. ';
            
            if (error.text) {
                console.error('EmailJS Fehlertext:', error.text);
                errorMessage += `Details: ${error.text}`;
            } else if (error.message) {
                errorMessage += `Details: ${error.message}`;
            } else {
                errorMessage += 'Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.';
            }
            
            showNotification(errorMessage, 'error');
        } finally {
            // Button wieder aktivieren
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Reservierung bestätigen';
        }
    });
});

function showNotification(message, type) {
    // Bestehende Benachrichtigungen entfernen
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animation anzeigen
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Nach 5 Sekunden ausblenden
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function openReservation() {
    const reservationWindow = document.getElementById('reservation-window');
    reservationWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeReservation() {
    const reservationWindow = document.getElementById('reservation-window');
    reservationWindow.style.display = 'none';
    document.body.style.overflow = '';
}