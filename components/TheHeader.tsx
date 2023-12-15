import { Navigation } from "./Navigation";


const navItem=[
  {label:'home', href:'/'},
  {label:'photo', href:'/photo'},
  {label:'favorite', href:'/favorite'},
]


const TheHeader = () => {
  return (
    <header>
     <Navigation navLinks={navItem}/>
    </header>
  );
};

export { TheHeader };
