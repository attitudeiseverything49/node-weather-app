console.log('Running in client side')

const fetching =(address,callback) => {
fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
    response.json().then((data)=>{
        callback(data)
    })
})
}

const search = document.querySelector('input')
const myForm = document.querySelector('form')
const messageone = document.querySelector('#message_one')
const messagetwo = document.querySelector('#message_two')
myForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageone.textContent = "Loading..."
    messagetwo.textContent = " "
    fetching(search.value,(data)=>{
        if(data.error){
        messageone.textContent = data.error }
        else{
        console.log("pass")
        messageone.textContent = data.location
        messagetwo.textContent = data.forecast}
    })
    })