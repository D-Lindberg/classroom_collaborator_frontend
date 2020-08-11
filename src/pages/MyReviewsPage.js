import React, { useState, useEffect } from 'react'
import ReviewsAPI from '../API/ReviewsAPI' 
import ClassSectionAPI from '../API/ClassSectionAPI' 
import ReviewList from '../components/Reviews/ReviewsList'
import ReviewForm from '../ReviewForm/ReviewForm'
import { useHistory } from "react-router-dom";
import './MyReviewsPage.css' 


const MyReviewsPage = () => {
	
// REVIEWS are the user's previously created views
const [reviews, setreviews] = useState()
//USERSECTIONS exists so the dropdown menu will only allow you to create a New Review of a class you're enrolled in
const [UserSections, setUserSections] = useState()

//This will allow us to redirect after creating a new review
let history = useHistory();


// Sets Reviews in state to the Reviews associated with the current user from the database

useEffect(() => {
ReviewsAPI.fetchReviews().then(ListOfReviews => {
	setreviews(ListOfReviews["reviews"])})
},[]);



//Sets USERSECTIONS to Sections associated
useEffect(() => {
	ClassSectionAPI.fetchCurrentUserClasses().then(myClassSections => {
		
	setUserSections(myClassSections["sections"])
	})
},[]);


const HandleSubmitReview = evt => {
	evt.preventDefault();
	console.log('Submitted');
	const SectionID = (evt.target[0].value);
	
	const Description = (evt.target[1].value);
	const reviewObject = {
			sectionID: SectionID,
			description: Description,
		}
		
	ReviewsAPI.addReviews(reviewObject).then(AllReviewsByUser => {
		setreviews(AllReviewsByUser["reviews"])
	});
}

// useEffect(() => {
// ReviewsAPI.fetchReviews().then(ListOfReviews => {
// 	setreviews(ListOfReviews["reviews"])})
// },[]);



	
  return (
    <div>
		<h1 style = {{ textalign:'center' }}>Leave a new Review!
        </h1>
		<br></br>
		<ReviewForm HandleSubmitReview= {HandleSubmitReview} UserSections={UserSections} />

<h2> Your Past Class Reviews! </h2>
        <ReviewList Reviews={reviews} />
    </div>
  )
}

export default MyReviewsPage



