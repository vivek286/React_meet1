// import newmeetup from '../../components/meetups/NewMeetupForm'
import { useRouter } from "next/router";
import Addingmeet from "../../components/meetups/NewMeetupForm";
function Newmeetup(){
   const router= useRouter();
async function addmeetuphandler(entermeetupdata){
const response=await fetch('/api/new-meetup',{
    method:'POST',
    body:JSON.stringify(entermeetupdata),
    headers:{
        'content-type':"application/json"
    }
});
const data=await response.json();
console.log(data);
router.push('/');
}

return <Addingmeet onAddMeetup={addmeetuphandler}/>
}
export default Newmeetup;