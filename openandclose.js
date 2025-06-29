function openMenu() {
    document.getElementById('menu-window').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling of background
    document.documentElement.style.overflow = 'hidden'; // Also prevent scrolling on <html>
}

function closeMenu() {
    document.getElementById('menu-window').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    document.documentElement.style.overflow = 'auto'; // Restore scrolling on <html>
}

function openReservation() {
    document.getElementById('reservation-window').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}

function closeReservation() {
    document.getElementById('reservation-window').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}




