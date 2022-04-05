import Swal from 'sweetalert2'


document.addEventListener("DOMContentLoaded",login, false);

const sesion = sessionStorage.getItem('sesion-estatus');
const user = sessionStorage.getItem('rol-user');

let users =[{user:"superuser",password:"root"}]

function login() {
    
    if(sesion != 'activate'){
        Swal.fire({
            title: 'Iniciar sesión',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Ingresar',
            allowOutsideClick: false,
            focusConfirm: false,
            confirmButtonColor: 'rgb(255 155 0)',
            preConfirm: () => {
              const login = Swal.getPopup().querySelector('#login').value
              const password = Swal.getPopup().querySelector('#password').value
              if (!login || !password) {
                Swal.showValidationMessage(`Por favor ingrese las credenciales.`)
              }
              return { login: login, password: password }
            }
          }).then((result) => {
              if(result.value.login == users[0].user & result.value.password == users[0].password){
                sessionStorage.setItem('sesion-estatus','activate');
                sessionStorage.setItem('rol-user',users[0].user);
                
              }
              else{
                alert("Credenciales incorrectas!")
                location.reload();
              }
            
        })
    }
    
}