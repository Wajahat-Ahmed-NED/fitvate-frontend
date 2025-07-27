import Swal from 'sweetalert2';

export default function errorAlert(message: string) {
    console.log("message recieved", message)
    Swal.fire({
        title: 'Error!',
        text: `${message}`,
        timer: 5000,
        icon: 'error',
        width: '300px',
        padding: '1rem',
        customClass: {
            popup: 'p-4 rounded-md shadow-md',
            title: 'text-lg font-semibold',
            htmlContainer: 'text-sm',
            confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded',
        },
        confirmButtonText: 'Okay',
        buttonsStyling: false, // required to use Tailwind styles
    })
}