// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const userIdInput = document.getElementById('userId'); // Input field for Discord User ID
    const errorMessage = document.querySelector('.error-message'); // Error message element
    const discordForm = document.getElementById('discordForm'); // Discord form element

    // Event listener for input changes in the user ID field
    userIdInput.addEventListener('input', function() {
        let inputValue = this.value.replace(/\D/g, ''); // Remove non-numeric characters
        inputValue = inputValue.slice(0, 18); // Limit to 18 characters
        this.value = inputValue; // Update input field with cleaned value

        // Validate the length of the input value
        if (inputValue.length !== 18) {
            this.parentElement.classList.add('invalid'); // Mark input container as invalid
            errorMessage.style.display = 'block'; // Show error message
        } else {
            this.parentElement.classList.remove('invalid'); // Remove invalid marking
            errorMessage.style.display = 'none'; // Hide error message
        }
    });

    // Event listener for form submission
    discordForm.addEventListener('submit', function(event) {
        const inputValue = userIdInput.value.trim(); // Get trimmed input value

        // Validate the input value length
        if (inputValue === '' || inputValue.length !== 18) {
            userIdInput.parentElement.classList.add('invalid'); // Mark input container as invalid
            errorMessage.style.display = 'block'; // Show error message

            // Trigger shake animation for invalid input
            userIdInput.parentElement.classList.remove('shake-animation');
            void userIdInput.parentElement.offsetWidth; // Force reflow to restart animation
            userIdInput.parentElement.classList.add('shake-animation'); // Start shake animation
            setTimeout(function() {
                userIdInput.parentElement.classList.remove('shake-animation'); // Reset animation after 500ms
            }, 500);

            event.preventDefault(); // Prevent form submission
        } else {
            userIdInput.parentElement.classList.remove('invalid'); // Remove invalid marking
            errorMessage.style.display = 'none'; // Hide error message

            // Check if the ID has been used recently (mocked example)
            const idWasUsedRecently = checkIfIdUsedRecently(inputValue);

            if (idWasUsedRecently) {
                showFailedToast(); // Show failure toast if ID was used recently
            } else {
                showNotifications(); // Show success and info toasts
                markIdAsUsed(inputValue); // Simulate marking ID as used (replace with actual logic)
            }

            event.preventDefault(); // Prevent form submission
        }
    });

    // Event listener to remove shake animation on input focus
    userIdInput.addEventListener('focus', function() {
        userIdInput.parentElement.classList.remove('shake-animation'); // Remove shake animation class
    });

    // Event listener to remove shake animation on form reset
    discordForm.addEventListener('reset', function() {
        userIdInput.parentElement.classList.remove('shake-animation'); // Remove shake animation class
    });

    // Function to check if the ID has been used recently (mocked example)
    function checkIfIdUsedRecently(id) {
        const usedIds = ['123456789012345678']; // Mocked list of recently used IDs
        return usedIds.includes(id); // Check if the provided ID is in the list
    }

    // Function to simulate marking the ID as used (replace with actual logic)
    function markIdAsUsed(id) {
        // Example logic: Store the ID or mark it as used
        // localStorage.setItem('lastUsedId', id); // Example of storing in localStorage
    }

    // Function to show success and info notifications
    function showNotifications() {
        // Toast configuration for success notification
        const SuccessToast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer); // Pause timer on mouse enter
                toast.addEventListener('mouseleave', Swal.resumeTimer); // Resume timer on mouse leave
            }
        });

        // Toast configuration for info notification
        const InfoToast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer); // Pause timer on mouse enter
                toast.addEventListener('mouseleave', Swal.resumeTimer); // Resume timer on mouse leave
            }
        });

        // Show success toast immediately
        SuccessToast.fire({
            icon: 'success',
            title: 'You just got 2 points',
            text: 'Now you are in a cooldown for an hour'
        });

        // Show info toast after a delay
        setTimeout(() => {
            InfoToast.fire({
                icon: 'info',
                title: 'INFO',
                text: 'Head to #bubble-bot channel and use the commands'
            });
        }, 3000); // Delay the info toast by 3 seconds (adjust timing as needed)
    }

    // Function to show failed notification
    function showFailedToast() {
        // Toast configuration for failure notification
        const FailedToast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer); // Pause timer on mouse enter
                toast.addEventListener('mouseleave', Swal.resumeTimer); // Resume timer on mouse leave
            }
        });

        // Show failure toast
        FailedToast.fire({
            icon: 'error',
            title: 'Failed',
            html: '<div style="text-align: center;">This Discord User ID has already been used within the last hour.<br>Please wait before submitting again.</div>'
        });
    }
});
