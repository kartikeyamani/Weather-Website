
const weatherform=document.querySelector('form')
const search = document.querySelector('input')
const para=document.querySelector('#content-1')
const para2=document.querySelector('#content-2')
const para3=document.querySelector('#content-3')
const para4=document.querySelector('#content-4')

para.textContent=""

weatherform.addEventListener('submit',(e)=>{
  e.preventDefault()
  const address=search.value

  weatherform.textContent=""
  para2.textContent="LOADING...."
  fetch('http://localhost:3000/weather?address='+address).then((response)=>{
      

    response.json().then((data)=>{
        if(data.error){
           para.textContent=data.error;
        }else{

            para.textContent="Location : "+data.Location
            para2.textContent="Temperature : "+data.Temperature+" degrees"
           para3.textContent="Humidity : "+data.Humidity+"%"
           para4.textContent="Weather is "+data.Weather
        }
    })
})

 


})

