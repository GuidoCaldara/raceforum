const flashMessages = () =>{
  let element = document.querySelector("#flash_messages")
  if (element != null){
    console.log("kljlkjlkjlkjdlkjdkljkdljkljlkdjkldjlkdjlkdjkldjkldjdlkdj");
    let width = element.offsetWidth
    element.style.top = (window.pageYOffset + window.innerHeight / 2.5) + "px"
    element.style.right = ((window.innerWidth -  element.offsetWidth) / 2) + "px"
  }
}


export {flashMessages}
