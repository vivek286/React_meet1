import MeetupList from "../components/meetups/MeetupList";
import { Fragment, useEffect , useState } from "react";
import { MongoClient } from "mongodb";
import Head from 'next/head';
// const Dummy_Meetup=[
//   {
//     id:"m1",
//     title:"First Meetup",
//     image:"https://upload.wikimedia.org/wikipedia/commons/8/85/Conseil_d%27Etat_Paris_WA.jpg",
//     address: "patanahi"
//   },
//   {
//     id:"m2",
//     title:"Second Meetup",
//     image:"https://upload.wikimedia.org/wikipedia/commons/8/85/Conseil_d%27Etat_Paris_WA.jpg",
//     address: "patanahi"
//   }
// ]
function homepage(props){
  return (
  <Fragment>
     <Head>
      <title>
         React Meetings
      </title>
      
    </Head>
    <MeetupList meetups={props.meetups}/>
  </Fragment>
  );
  
}
export async function getStaticProps(){
  const client=await MongoClient.connect('mongodb+srv://Admin:Vivek123@cluster0.tduui.mongodb.net/meetups?retryWrites=true&w=majority');
  const db=client.db();
  
  
  
  const meetupsCollections=db.collection('meetups');
  const meetUUps=await meetupsCollections.find().toArray().reverse();
  // fetch('/api/meetups');
  client.close();

  return{
    props:{
      meetups: meetUUps.map(meetup=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString()

      }))
    },
    revalidate: 10
  };

}
// export async function getServerSideProps(context){

//   const req=context.req;
//   const res=context.res;

//   return {
//     props:{
//       meetups:Dummy_Meetup
//     } 
//   };
// }
export default homepage;
