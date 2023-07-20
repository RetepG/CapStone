// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import DeleteItem from '../DeleteItem';
// import Logo from "../../assets/Logo.png";
// import './Navigation.css';

// function Navigation({ isLoaded }) {
// 	const sessionUser = useSelector(state => state.session.user);

// 	return (
// 		<ul>
// 			<div className='Nav-bar'>
// 				<li>
// 					<NavLink exact to="/" className='Logo-link'>
// 						<img src={Logo} alt="Cat Logo" className='Logo'></img>
// 					</NavLink>
// 					<NavLink className="Home" exact to="/">BlahBlah</NavLink>
// 				</li>
// 				<NavLink to="/items/new" activeClassName="active">
// 					Create a New Item
// 				</NavLink>
// 				{isLoaded && (
// 					<li className='Profile'>
// 						<ProfileButton user={sessionUser} />
// 					</li>
// 				)}
// 			</div>
// 		</ul>
// 	);
// }

// export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from "../../assets/Logo.png";
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul>
			<div className='Nav-bar'>
				<li>
					<NavLink exact to="/" className='Logo-link'>
						<img src={Logo} alt="Cat Logo" className='Logo'></img>
					</NavLink>
					<NavLink className="Home" exact to="/">BlahBlah</NavLink>
				</li>
				{sessionUser && (
					<li>
						<NavLink to="/items/new" activeClassName="active">
							Create a New Item
						</NavLink>
					</li>
				)}
				{isLoaded && (
					<li className='Profile'>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</div>
		</ul>
	);
}

export default Navigation;
