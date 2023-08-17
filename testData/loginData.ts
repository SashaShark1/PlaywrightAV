function random(){
    return Math.floor(Math.random() * 999)
  }

// Не использовала enum, так как ругается на динамическое свойство `testtom${random()}@gmail.com`
export const User = {
    name :'Tom',
    lastName : 'Cruis',
    logEmail :'testtom@gmail.com',
    changeEmail : `testtom${random()}@gmail.com`,    
    phone: '1234567',
    password : '123456789',
    confirm: '123456789'
}

