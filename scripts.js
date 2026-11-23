// Function to handle form submission
function handleDonorRegistration(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        age: document.getElementById('age').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        registrationDate: new Date().toLocaleString()
    };

    // Get existing donors or initialize empty array
    let donors = JSON.parse(localStorage.getItem('donors') || '[]');
    
    // Add new donor
    donors.push(formData);
    
    // Save back to localStorage
    localStorage.setItem('donors', JSON.stringify(donors));

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3>Registration Successful!</h3>
        <p>Thank you ${formData.fullName} for registering as a blood donor.</p>
        <p>Your details have been saved.</p>
    `;

    // Clear form
    document.getElementById('donorForm').reset();

  
    const formContainer = document.querySelector('.registration-form');
    formContainer.appendChild(successMessage);

    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Function to view registered donors
function viewDonors() {
    const donors = JSON.parse(localStorage.getItem('donors') || '[]');
    const donorsList = document.getElementById('donorsList');
    
    if (donors.length === 0) {
        donorsList.innerHTML = '<p>No donors registered yet.</p>';
        return;
    }

    let html = '<h3>Registered Donors</h3><div class="donors-grid">';
    donors.forEach((donor, index) => {
        html += `
            <div class="donor-card">
                <h4>${donor.fullName}</h4>
                <p>Blood Group: ${donor.bloodGroup}</p>
                <p>Age: ${donor.age}</p>
                <p>Phone: ${donor.phone}</p>
                <p>Email: ${donor.email}</p>
                <p>Registered: ${donor.registrationDate}</p>
                <button onclick="removeDonor(${index})" class="remove-btn">Remove</button>
            </div>
        `;
    });
    html += '</div>';
    donorsList.innerHTML = html;
}

// Function to remove a donor
function removeDonor(index) {
    let donors = JSON.parse(localStorage.getItem('donors') || '[]');
    donors.splice(index, 1);
    localStorage.setItem('donors', JSON.stringify(donors));
    viewDonors();
}
