import React, { useState, useEffect } from 'react'
import MySectionList from '../components/Sections/MySectionList';
import ClassSectionAPI from '../API/ClassSectionAPI';



const MyClassesPage = () => {
	
const [CurrentClasses, setCurrentClasses] = useState()

useEffect(() => {
	ClassSectionAPI.fetchCurrentUserClasses().then(ClassesImIn => {
		setCurrentClasses(ClassesImIn["sections"]);
	})},[]);


  return (
    <div>
	  <h2> Your Enrolled Classes! </h2>
        <MySectionList CurrentClasses={CurrentClasses} />
    </div>
  )
}

export default MyClassesPage
