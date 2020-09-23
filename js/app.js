let unorder_list = document.getElementById("navbar__list");
let section_items = document.querySelectorAll("section");
let NumOfSection = section_items.length;

function Build_Nav(){
    
    for(let i=1 ; i<=NumOfSection ; i++)
    {
        let li_item = document.createElement("li");
        let section_Name = section_items[i-1].getAttribute("data-nav");
        li_item.textContent = section_Name;
        li_item.classList.add("menu__link")
        li_item.setAttribute("id","Section"+i);
        // set first section active by default
        if(i == 1)
        {
            li_item.classList.add("active__link")
            li_item.innerHTML += "<span class='close_button'>X</span>"
        }
        
        let data = section_items[i-1].getAttribute("id");
        li_item.setAttribute("data-nav",data);
        unorder_list.appendChild(li_item);
    }

}

function ScrollToSection()
{
    unorder_list.addEventListener("click",function(event){
        let navLink = event.target;
        if(navLink.classList.contains("menu__link"))
        {
            let section = document.querySelector("#"+event.target.dataset.nav);
            section.scrollIntoView({behavior:"smooth",block:"start"});     
        }
        else if(navLink.classList.contains("close_button"))
        {
            let listbutton = document.getElementById("list__button");
            listbutton.style.display= "block";
            unorder_list.style.display="none";
         }
    })
}

// button function to go top of the page
function goUp()
{
    window.scrollTo(0,0);
    let elm = document.getElementById("Up-button");
    elm.remove();
    
    let active_element = document.querySelector(".your-active-class");
    active_element.classList.remove("your-active-class");
    document.querySelector("section").classList.add("your-active-class");   
}

// find in view section
function Find_Section()
{
    let InViewSec = section_items[0];
    let min = 1000000;
    for(item of section_items)
        {
            let bounding = item.getBoundingClientRect();
            if(bounding.top > -300 && bounding.top < min)
                {
                    min = bounding.top;
                    InViewSec =item;
                }
        }
    return InViewSec ;
}

function Set_ActiveSec()
{
    window.addEventListener("scroll",function(){
        let activeSection = Find_Section();
        activeSection.classList.add("your-active-class");
        
        let LinkName = activeSection.getAttribute("data-nav").replace(/ /g,'');
        let ActiveLink = document.querySelector("#"+LinkName);
        ActiveLink.classList.add("active__link");
        
        
        for(item of section_items)
            {
                if(item != activeSection)
                {
                    item.classList.remove("your-active-class");
                   let OldLinkName = item.getAttribute("data-nav").replace(/ /g,'');
                   let OldActiveLink = document.querySelector("#"+OldLinkName);
                    OldActiveLink.classList.remove("active__link");
                }
            }
        
        // Control on button page
        let TopButton = document.getElementById("button_Top");
        if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
            TopButton.style.display = "block";
        else
           TopButton.style.display = "none";
    });
    
    
    
}

// function to go top of the page when click on button 
function goUp()
{
    document.documentElement.scrollTop = 0;
}

function Show_List()
{
    let listbutton = document.getElementById("list__button");
    listbutton.style.display= "none";
    unorder_list.style.display="block";
}


Build_Nav();
ScrollToSection();
Set_ActiveSec();