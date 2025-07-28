let profileImageLoaded = false;

document.getElementById('profilePic').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = document.getElementById('displayPic');
    img.onload = () => {
      profileImageLoaded = true;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('membershipForm').addEventListener('submit', function(e) {
  e.preventDefault();

  document.getElementById('displayName').innerText = document.getElementById('fullName').value;
  document.getElementById('displayEmail').innerText = document.getElementById('email').value;
  document.getElementById('displayUsername').innerText = "@" + document.getElementById('username').value;
  document.getElementById('displayCityState').innerText =
    document.getElementById('city').value + ", " + document.getElementById('state').value;

  document.querySelector('.form-wrapper').style.display = 'none';
  document.getElementById('idPage').style.display = 'block';
});

document.getElementById('downloadBtn').addEventListener('click', function () {
  const idCard = document.getElementById('idCard');
  const bgImg = document.getElementById('bgImg');

  // Wait until all images are loaded
  if (!profileImageLoaded || !bgImg.complete) {
    alert("Please wait for all images to load before downloading.");
    return;
  }

  html2canvas(idCard, {
    allowTaint: true,
    useCORS: true,
    scale: 2,
    backgroundColor: null
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'OSMC_Membership_ID.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    alert("Download failed. Please make sure all images are loaded.");
    console.error(err);
  });
});
