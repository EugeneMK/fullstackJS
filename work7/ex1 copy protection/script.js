const copyProtect = (e) => {
    e.preventDefault();
    alert('Copying content is prohibited!');
};

document.addEventListener('contextmenu', copyProtect);
document.addEventListener('copy', copyProtect);
document.addEventListener('cut', copyProtect);