// 18 images to make gun more fun
const armoryData = [
  { name: "Glock 19", img: "./images/Glock19.jpg", desc: "Standard issue hand gun."}, 
  { name: "M4A1 Carbine", img: "./images/M4A1.jpg", desc: "Standard issue assault rifle." },
  { name: "M249 SAW", img: "./images/SAW.jpg", desc: "Squad automatic weapon." },
  { name: "Barrett M82", img: "./images/Berrett.jpg", desc: "Anti-materiel sniper rifle." },
  { name: "MP5 Submachine Gun", img: "./images/MP5.jpg", desc: "Widely used by special forces." },
  { name: "AK47", img: "./images/AK47.jpg", desc: "Russian Origins." },
  { name: "M1014 Shotgun", img: "./images/M1014.jpg", desc: "Semi-automatic combat shotgun." },
  { name: "L15 Sniper", img: "./images/L15.jpg", desc: "Accuracy International." },
  { name: "Saiga 12 Shotgun", img: "./images/Saiga12.jpg", desc: "Semi-automatic combat shotgun." },
  { name: "FN 15", img: "./images/FN15.jpg", desc: "This is Carlos' favorite piece." },
  { name: "Thompson Submachine Gun", img: "./images/ThompsonSubmachineGun.jpg", desc: "Famously known as the Tommy Gun." },
  { name: "380 ACP", img: "./images/380.jpg", desc: "Compact, low-recoil handgun cartridge." },
  { name: "MP40", img: "./images/MP40.jpg", desc: "An iconic 9x19mm submachine gun developed in Nazi Germany." },
  { name: "Cyma SGR 12", img: "./images/CymaSGR12.jpg", desc: "electric tri-shot airsoft shotgun that fires 3 BBs simultaneously per trigger pull." },
  { name: "Desert Eagle", img: "./images/DesertEagle.jpg", desc: "An iconic, gas-operated, semi-action handgun ." },
  { name: "M60", img: "./images/M60.jpg", desc: "American air-cooled, belt-fed, open-bolt general-purpose machine gun." },
  { name: "UMP 45", img: "./images/UMP.jpg", desc: "lightweight, polymer-framed submachine gun chambered in powerful .45 ACP." },
  { name: "Mossberg Maverick", img: "./images/MossbergMaverick.jpg", desc: "Budget-friendly, highly reliable pump-action shotgun." },

];

// Cache elements using getElementById & querySelector
const gridContainer = document.getElementById('armory-grid');
const template = document.getElementById('gun-template');
const clearanceForm = document.querySelector('#clearance-form');
const callsignInput = document.querySelector('#callsign');
const errorMessage = document.querySelector('#error-message');
const systemInfo = document.getElementById('system-info');


// window.navigator for browser info, 2. window.innerWidth for screen size
systemInfo.textContent = `Terminal logged in from: ${window.navigator.userAgent.split(' ')[0]} | Viewport: ${window.innerWidth}px`;

// DocumentFragment, cloneNode, createElement, appendChild, Iterate over collection
function buildArmory() {
  const fragment = document.createDocumentFragment();

  armoryData.forEach(weapon => {
    // Clone the template
    const clone = template.content.cloneNode(true);
    
    // Cache the elements inside the clone
    const card = clone.querySelector('.gun-card');
    const title = clone.querySelector('.gun-name');
    const img = clone.querySelector('.gun-image');
    const desc = clone.querySelector('.gun-desc');

    // Modify HTML/text content 
    title.textContent = weapon.name;
    desc.textContent = weapon.desc;

    // Modify at least one attribute (src and alt)
    img.setAttribute('src', weapon.img);
    img.setAttribute('alt', `Image of ${weapon.name}`);

    // Event Listeners (Hover effects) & Modify style/classes 
    card.addEventListener('mouseenter', (e) => {
      /// Parent-child-sibling relationship 
      // e.target is the card. We navigate down to its children.
      const targetImg = e.target.querySelector('.gun-image');
      const targetDesc = e.target.querySelector('.gun-desc');
      
      targetImg.style.display = 'block';
      targetDesc.style.display = 'block';
      e.target.style.borderColor = '#ff0800'; //Change style on interaction
    });

    card.addEventListener('mouseleave', (e) => {
      const targetImg = e.target.querySelector('.gun-image');
      const targetDesc = e.target.querySelector('.gun-desc');
      
      targetImg.style.display = 'none';
      targetDesc.style.display = 'none';
      e.target.style.borderColor = '#333';
    });

    // Append configured clone to fragment
    fragment.appendChild(clone);
  });

  // Append fragment to DOM (only 1 reflow)
  gridContainer.appendChild(fragment);
}

// validation
clearanceForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page reload

  const callsignValue = callsignInput.value.trim();
  
  //  DOM JS  logic


if (callsignValue.toLowerCase() === "admin") {
    errorMessage.textContent = "Error: 'Admin' is a restricted callsign.";
    callsignInput.classList.add('error-border');
     // Modify classList
  } else if (!/^[a-zA-Z0-9]+$/.test(callsignValue)) {
    errorMessage.textContent = "Error: Callsign must be alphanumeric.";
  } else {
    errorMessage.textContent = "";
    // BOM  (window.alert) 
    window.alert(`Clearance granted for Operative ${callsignValue}. Welcome to the Armory.`);
    clearanceForm.reset();
  }
});

// Initialize the application
buildArmory();
