import classes from './meetupdetails.module.css'


function meetingdetails(props){
    return( <section className={classes.details}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </section>);
}
export default meetingdetails;