// import meetingdetails from "../../components/meetups/meetupdetails"
import { MongoClient ,ObjectId } from 'mongodb';
import MEEtingdetails from '../../components/meetups/meetupdetails';

function Meatupdetails(props){

    return <MEEtingdetails
     image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
    
    
    
    />
}
export async function getStaticPaths(){
    
    const client=await MongoClient.connect('mongodb+srv://Admin:Vivek123@cluster0.tduui.mongodb.net/meetups?retryWrites=true&w=majority');
  const db=client.db();
  
  
  
  const meetupsCollections=db.collection('meetups');
  const meetups= await meetupsCollections.find({},{_id:1}).toArray();
  client.close();  
  return{
        fallback: false,
        paths:meetups.map(meetup=>({
            params:{
                meetupid:meetup._id.toString()
            }
        }))
        
        
        
        
        
        
    }
}
export async function getStaticProps(context){
    const meetingID=context.params.meetupid;
    const client=await MongoClient.connect('mongodb+srv://Admin:Vivek123@cluster0.tduui.mongodb.net/meetups?retryWrites=true&w=majority');
  const db=client.db();
  
  
  
  const meetupsCollections=db.collection('meetups');
  const Selectedmeetups= await meetupsCollections.findOne({_id: ObjectId(meetingID)});
  client.close();  
    return{
        props:{
            meetupData:{
                id: Selectedmeetups._id.toString(),
                title: Selectedmeetups.title,
                address: Selectedmeetups.address,
                image: Selectedmeetups.image,
                description: Selectedmeetups.description,
            }
        }
    }
}
export default Meatupdetails;