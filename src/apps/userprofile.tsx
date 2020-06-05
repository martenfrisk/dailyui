import React, { useEffect, useState } from 'react'
import defaultAvatar from '../img/userprofile_avatar.jpg'
import beach from '../img/beach.jpg'
import Phone from '../img/phone.svg'
import Twitter from '../img/twitter.svg'
import Email from '../img/letter.svg'
import Birthday from '../img/birthday-cake.svg'
import Location from '../img/locate.svg'
var randomProfile = require('random-profile-generator')

const UserProfile = () => {
	const [ profile, setProfile ] = useState({
		fullName: 'Della Edwards',
		firstName: 'Della',
		lastName: 'Edwards',
		gender: 'Male',
		birthday: 'Mar 24th, 1959',
		age: 57,
		address: '49 Foxrun St., Manchester Township, NJ 08759',
		zip: '08759',
		state: 'NJ',
		phone: '(876) 547-1223',
		email: 'cedi@to.cc',
		twitter: '@wunwegda'
	})
	const [ quote, setQuote ] = useState({
		quote: 'There’s no shame in fear, my father told me, what matters is how we face it.',
		character: 'Jon Snow'
	})
	const [ imgBg, setImgBg ] = useState(beach)
	const quoteAPI = 'https://got-quotes.herokuapp.com/quotes'
	const mapAPI = '&key=AIzaSyDUEYyUKyMgRtSeXt9TK9nPqLS9GU02Dzc'
	const mapBaseURL = 'https://maps.googleapis.com/maps/api/staticmap?size=400x300&zoom=15'
	const imgApi = 'https://source.unsplash.com/1600x900/?beach'
	useEffect(() => {
		setProfile(randomProfile.profile())
		fetch(quoteAPI).then((response) => response.json()).then((data) => setQuote(() => data))
		fetch(imgApi).then((response) => response.blob()).then((image) => {
			setImgBg(() => URL.createObjectURL(image))
		})
	}, [])

	/*
{ 
    id: 'dc3800ea-0ae8-592a-bcd6-2012667c3ccc',
    fullName: 'Della Edwards',
    firstName: 'Della',
    lastName: 'Edwards',
    gender: 'Male',
    birthday: 'Mar 24th, 1959',
    age: 57,
    avatar: 'https://api.adorable.io/avatars/200/Della-Edwards',
    address: '49 Foxrun St., Manchester Township, NJ 08759',
    zip: '08759',
    state: 'NJ',
    phone: '(876) 547-1223',
    email: 'cedi@to.cc',
    twitter: '@wunwegda',
    ssn: '744-48-5102'
}
*/

	return (
		<div className="px-4">
			<div className="w-full md:w-1/2 h-auto md:mx-auto rounded-tr-full rounded-tl-full shadow-xl flex flex-col mt-12 items-center h-full">
				<div className="w-full h-auto">
					<img src={imgBg} alt="" className="w-full h-auto rounded-tr-full rounded-tl-full" />
				</div>
				<div className="w-1/2 flex justify-center">
					<img
						src={
							'https://thispersondoesnotexist.com/image' ? (
								'https://thispersondoesnotexist.com/image'
							) : (
								defaultAvatar
							)
						}
						className="w-full h-auto -mt-40 md:-mt-16 rounded-full border-white border-8 shadow-md"
						alt="source: thispersondoesnotexist.com"
					/>
				</div>

				<div className="text-3xl w-full text-center font-semibold">{profile.fullName}</div>

				<div className="w-full h-64 flex self-start bg-red-300 justify-start items-center mt-8">
					<div className="flex flex-col justify-center py-4 px-4">
						<div className="text-white text-lg flex items-center mb-2">
							<img src={Twitter} alt="" className="mr-4 w-10 h-10" />
							<div>{profile.twitter}</div>
							<br />
						</div>
						<div className="text-white text-lg flex items-center mb-2">
							<img src={Phone} alt="" className="mr-4 w-10 h-10" />
							<div>{profile.phone}</div>
							<br />
						</div>
						<div className="text-white text-lg flex items-center mb-2">
							<img src={Email} alt="" className="mr-4 w-10 h-10" />
							<div>{profile.email}</div>
						</div>
						<div className="text-white text-lg flex items-center mb-2">
							<img src={Birthday} alt="" className="mr-4 w-10 h-10" />
							<div>{profile.age}</div>
						</div>
					</div>
				</div>

				<div className="w-full h-64 bg-orange-200 text-center flex self-end items-center">
					<div className="flex w-1/2 items-center">
						<img src={Location} alt="" className="mx-auto w-10 h-10" />
					</div>
					<img
						src={mapBaseURL + mapAPI + '&center=' + profile.address + '&markers=%7C' + profile.address}
						alt="Map"
						className="w-auto h-64"
					/>
				</div>
				<div className="my-8 bg-white px-8 py-6 w-full rounded-md">
					<div>
						My favourite quote:<br />
						<div className="font-serif px-4 py-2">
							{quote.quote}
							<br />
							<p className="italic">- {quote.character}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
