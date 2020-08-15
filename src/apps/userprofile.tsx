import React, { useEffect, useState } from 'react'
import defaultAvatar from '../img/userprofile_avatar.jpg'
import beach from '../img/beach500.jpg'
import Phone from '../img/smartphone.svg'
import Twitter from '../img/twitter.svg'
import Email from '../img/letter.svg'
import Birthday from '../img/birthday-cake.svg'
import '../styles/userprofile.css'
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
	const mapAPI = '&key=AIzaSyCQVyaktNgPAyLkFBzq6DFWNUWmymMDinE'
	const mapBaseURL = 'https://maps.googleapis.com/maps/api/staticmap?size=400x300&zoom=15'
	const imgApi = 'https://source.unsplash.com/500x500/?beach'
	useEffect(() => {
		setProfile(randomProfile.profile())
		fetch(quoteAPI).then((response) => response.json()).then((data) => setQuote(() => data))
		fetch(imgApi).then((response) => response.blob()).then((image) => {
			setImgBg(() => URL.createObjectURL(image))
		})
	}, [])

	return (
		<div className="px-4">
			<div className="flex flex-col items-center h-auto h-full mx-auto mt-12 rounded-tl-lg rounded-tr-lg shadow-xl w-96">
				<div className="absolute top-auto left-auto z-0">
					<img src={imgBg} alt="" className="rounded-tl-lg rounded-tr-lg w-96 h-96" />
				</div>
				<div className="z-10 flex justify-center w-1/3 h-auto mt-40">
					<img
						src={
							'https://thispersondoesnotexist.com/image' ? (
								'https://thispersondoesnotexist.com/image'
							) : (
								defaultAvatar
							)
						}
						className="w-32 h-auto border-4 border-white rounded-full shadow-md"
						alt="source: thispersondoesnotexist.com"
					/>
				</div>

				<div className="w-full h-12 pt-2 -mt-2 text-xl font-semibold text-center text-gray-800 glass">
					{profile.fullName}
				</div>

				<div className="z-10 flex flex-wrap items-center content-center justify-center w-full h-64 mt-12 bg-blue-200">

					<div className="flex flex-col items-center w-1/2 mb-2">
						<div className="bg-white border-4 border-blue-300 rounded-full ">
							<img src={Twitter} alt="" className="w-12 h-12 px-1 py-2" />
						</div>
						<div className="px-3 py-3 mt-2 text-sm text-blue-700 bg-white rounded-md">
							{profile.twitter}
						</div>
					</div>

					<div className="flex flex-col items-center w-1/2 mb-2">
						<div className="bg-white border-4 border-orange-300 rounded-full">
							<img src={Phone} alt="" className="w-12 h-12 py-2 " />
						</div>
						<div className="px-3 py-3 mt-2 text-sm text-blue-700 bg-white rounded-md">{profile.phone}</div>
					</div>

					<div className="flex flex-col items-center w-1/2 mt-4">
						<div className="bg-white border-4 border-green-300 rounded-full">
							<img src={Email} alt="" className="w-12 h-12 px-2 " />
						</div>
						<div className="px-3 py-3 mt-2 text-sm text-blue-700 bg-white rounded-md">{profile.email}</div>
					</div>

					<div className="flex flex-col items-center w-1/2 mt-4">
						<div className="bg-white border-4 border-purple-300 rounded-full">
							<img src={Birthday} alt="" className="w-12 h-12 py-2 " />
						</div>
						<div className="px-3 py-3 mt-2 text-sm text-blue-700 bg-white rounded-md">{profile.age}</div>
					</div>

				</div>

				<div className="flex items-center self-end w-full h-64 text-center bg-orange-200">
					<img
						src={
							mapBaseURL +
							mapAPI +
							'&center=' +
							encodeURIComponent(profile.address) +
							'&markers=%7C' +
							encodeURIComponent(profile.address)
						}
						alt="Map"
						className="w-auto h-64"
					/>
				</div>
				<div className="w-full px-8 py-6 my-4 bg-white rounded-md">
					<div>
						My favourite quote:<br />
						<div className="px-4 py-2 font-serif">
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
