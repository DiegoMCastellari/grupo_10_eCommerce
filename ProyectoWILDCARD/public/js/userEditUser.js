window.onload = function (e) {
    var formulario = document.querySelector('#formEdit');

    var fullName = document.querySelector('#fullname')
    var email = document.querySelector('#email')
    var telefono = document.querySelector('#telefono')
    var password = document.querySelector('#password')
    var confirmPassword = document.querySelector('#confirmpassword')

    //NOMBRE BLUR
    fullName.addEventListener('blur', function(event){
        if(fullName.value == ""){
            event.preventDefault();
                var fullNameError = document.querySelector('#nameError');
                fullNameError.innerHTML = "<li>" + "El campo Nombre Completo no puede estar vacio." + "</li>"
            } else if (fullName.value.length < 3){
                event.preventDefault();
                var fullNameError = document.querySelector('#nameError');
                fullNameError.innerHTML = "<li>" + "El campo Nombre Completo debe tener un minimo de 3 caracteres" + "</li>"
            };
    })

    //EMAIL BLUR

    email.addEventListener('blur', function(event){
        if(email.value == ""){
            event.preventDefault();
                var emailError = document.querySelector('#emailError');
                emailError.innerHTML = "<li>" + "El campo Email no puede estar vacio." + "</li>"
            } else if (email.value.includes("@")==false){
                var emailError = document.querySelector('#emailError');
                emailError.innerHTML = "<li>" + "El Email no es valido." + "</li>"
            }
    })

    //TELEFONO BLUR 

    telefono.addEventListener('blur', function(event){
        if (isNaN(telefono.value)|| telefono.value == "" ){
            event.preventDefault();
            var telefonoError = document.querySelector('#telefonoError');
            telefonoError.innerHTML = "<li>" + "El campo Telefono se debe completar con valores numericos" + "</li>";
        }
    })


    //CONTRASEÑA BLUR 

    oldpassword.addEventListener('blur', function(event){
        if(oldpassword.value == ""){
            event.preventDefault();
                var oldpasswordError = document.querySelector('#oldpasswordError');
                oldpasswordError.innerHTML = "<li>" + "El campo Contraseña no puede estar vacio." + "</li>"
            }else if(oldpassword.value.length<6){
                var oldpasswordError = document.querySelector('#oldpasswordError');
                oldpasswordError.innerHTML = "<li>" + "La contraseña debe tener un minimo de 6 caracteres." + "</li>"
   
            }
    })

    //CONFIRMAR CONTRASEÑA BLUR

    confirmPassword.addEventListener('blur', function(event){
       if (confirmPassword.value != password.value){
                event.preventDefault();
                var confirmError = document.querySelector('#confirmError');
                confirmError.innerHTML = "<li>" + "El campo Confrimar Contraseña debe coincidir con la contraseña." + "</li>"
            }
    })




    password.addEventListener('blur', function(event){
        if(password.value!="")
        {password.style.backgroundColor = "#FFF";
        confirmPassword.style.backgroundColor = "#FFF"}
        else{
            password.style.backgroundColor = "#929090";
        confirmPassword.style.backgroundColor = "#929090"
        }
    });
    formulario.addEventListener('submit', function(event){
        //NOMBRE
        if(fullName.value == ""){
            event.preventDefault();
                var fullNameError = document.querySelector('#nameError');
                fullNameError.innerHTML = "<li>" + "El campo Nombre Completo no puede estar vacio." + "</li>"
            } else if (fullName.value.length < 3){
                event.preventDefault();
                var fullNameError = document.querySelector('#nameError');
                fullNameError.innerHTML = "<li>" + "El campo Nombre Completo debe tener un minimo de 3 caracteres" + "</li>"
            };

        //EMAIL    
        if(email.value == ""){
        event.preventDefault();
            var emailError = document.querySelector('#emailError');
            emailError.innerHTML = "<li>" + "El campo Email no puede estar vacio." + "</li>"
        } else if (email.value.includes("@")==false){
            var emailError = document.querySelector('#emailError');
            emailError.innerHTML = "<li>" + "El Email no es valido." + "</li>"
        }

        //TELEFONO
        if (isNaN(telefono.value)|| telefono.value == "" ){
            event.preventDefault();
            var telefonoError = document.querySelector('#telefonoError');
            telefonoError.innerHTML = "<li>" + "El campo Telefono se debe completar con valores numericos" + "</li>";
        }


        
        //CONTRASEÑA
        if(oldpassword.value == ""){
            event.preventDefault();
                var oldpasswordError = document.querySelector('#oldpasswordError');
                passwordError.innerHTML = "<li>" + "El campo Contraseña no puede estar vacio." + "</li>"
            }else if(oldpassword.value.length<6){
                var oldpasswordError = document.querySelector('#oldpasswordError');
                oldpasswordError.innerHTML = "<li>" + "La contraseña debe tener un minimo de 6 caracteres." + "</li>"
   
            }


        //CONFIRMAR CONTRASEÑA
        if (confirmPassword.value != password.value){
                event.preventDefault();
                var confirmError = document.querySelector('#confirmError');
                confirmError.innerHTML = "<li>" + "El campo Confrimar Contraseña debe coincidir con la contraseña." + "</li>"
            }
        
    })

}