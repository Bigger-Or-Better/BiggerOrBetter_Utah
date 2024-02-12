"use client";
import React, {useState} from "react";
import ListingItem from "./ListingItem";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ListingCard = ({ postedListings, likedListings, currentUser}) => {
	console.log("postedListings_start",postedListings,"postedListings_end")
	console.log("likedListings_start",likedListings,"likedListings_end")

	const [listingView, setListingView] = useState("Posted");

	const router = useRouter();
	const deleteListing = async (listingId) => {
		const shouldDelete = window.confirm(
			"Are you sure you want to delete this listing?"
		);
		if (shouldDelete) {
			await axios
				.delete(`/api/listings/${listingId}`)
				.then((response) => {
					toast.success("Success");
					router.refresh();
				})
				.catch((error) => {
					toast.error("Something went wrong!");
				});
		}
	};

	const alterView = (e) =>{
		console.log(e.target.innerHTML);
		setListingView(e.target.innerHTML)
	}

	return (
		<div className={'row'}>
			<div>
				<button onClick={alterView}>Posted</button>
				<button onClick={alterView}>Liked</button>
			</div>

		{
			((listingView == "Posted") ?
			postedListings.map((list) => (
				<ListingItem
					cUser = {currentUser}	
					key={list.id}
					{...list}
					onDelete={() => deleteListing(list.id)}
					view={listingView}
				/>
			))
			:
			likedListings.map((list) => (
				<ListingItem
					cUser = {currentUser}	
					key={list.id}
					{...list}
					onDelete={() => deleteListing(list.id)}
					view={listingView}
				/>
			))
			 )
		}

			{/* {listings.map((list) => ( //if posted (different if liked)
				<ListingItem
					userName={currentUser.name} //wrong
					key={list.id}
					{...list}
					onDelete={() => deleteListing(list.id)}
				/>
			))} */}
		</div>
	);
};

export default ListingCard;