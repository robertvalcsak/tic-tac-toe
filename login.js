function login() {
    /** input id's : userName, password **/
  
      if(userName.value === 'user' && password.value === '1234') {
          window.location.assign('ticTacToe.html')
      } else {
          errorMessage.innerHTML = "Invalid password or username, please try again."
      };
  };
  