import { IconNews, IconGift, IconAward, IconTarget, IconPencil, IconUpload, IconSkateboard, IconHeadset, } from '@tabler/icons-react';
import { IconUser, IconUserEdit, IconUserCircle, IconUserSearch, IconCoin, IconFlame, } from '@tabler/icons-react';
import { IconMoodHappy, IconBox, IconKey, } from '@tabler/icons-react';
import { IconSpy, IconRobot, IconAlien } from '@tabler/icons-react';
import { IconFaceId, IconFaceIdError } from '@tabler/icons-react';
import { IconStar, IconLock } from '@tabler/icons-react';
import { IconBallFootball, IconSoccerField, IconCrown, IconGhost, IconRocket,  } from '@tabler/icons-react';
import { IconTool, IconHome, IconUsersGroup, IconShoppingCart, IconMessages, } from '@tabler/icons-react';
import { IconSwords, IconShield, IconSettings, IconDiscount2, IconAnkh,} from '@tabler/icons-react';
import { IconGenderFemale, IconWorld, IconMusic, IconHelp, } from '@tabler/icons-react';
import { IconMoonStars, IconHorseToy, IconWaveSine, } from '@tabler/icons-react';

const tablerProps = {
  xmlns: "http://www.w3.org/2000/svg", fill: "none",
  width: "24", height: "24", viewBox: "0 0 24 24",
  strokeWidth: "2", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round",
};

const HouseOdin = () => (
  <svg {...tablerProps} viewBox='0 0 48 48' strokeWidth='3.5' stroke='#000000'>
    <g>
      <path d="M28.6794,24h-2.15"></path>
      <path d="M32.3471,24h-2.15"></path>
      <path d="M36.0147,24h-2.15"></path>
      <path d="M39.6824,24h-2.15"></path>
      <path d="M21.4706,24h-2.15"></path>
      <path d="M17.8029,24h-2.15"></path>
      <path d="M14.1353,24h-2.15"></path>
      <path d="M10.4676,24h-2.15"></path>
      <path d="M24,15.6529v2.15"></path>
      <path d="M24,19.3206v2.15"></path>
      <path d="M24,26.5294v2.15"></path>
      <path d="M24,30.1971v2.15"></path>
      <path d="M24,33.8647v2.15"></path>
      <path d="M24,37.5324v2.15"></path>
      <path d="M24,11.9853v2.15"></path>
      <path d="M24,8.3176v2.15"></path>
      <path d="M10.3412,20.7118c21.7529-22.1324,15.1764,12.9,27.5706,15.6823"></path>
      <circle cx="24" cy="24" r="21.5"></circle>
      <circle cx="24" cy="24" r="0.75"></circle>
    </g>
  </svg>
);

const HouseWeber = (theme) => (
  <svg {...tablerProps}>
    <g>
      <path fill={theme} opacity="0.15" d="M12.0001 12C13.5621 10.4379 16.0948 10.4379 17.6569 12L20.4853 14.8284L14.8285 20.4853L12.0001 17.6568C10.438 16.0947 10.438 13.5621 12.0001 12C10.438 13.5621 7.90529 13.5621 6.3432 12L3.51477 9.17156L9.17162 3.51471L12.0001 6.34314C13.5621 7.90523 13.5621 10.4379 12.0001 12Z"></path>
      <path stroke={theme} d="M20.6777 15.0208L15.0209 20.6777M20.6777 15.0208L17.8492 12.1924M20.6777 15.0208L21.3848 15.7279M15.0209 20.6777L12.1924 17.8492M15.0209 20.6777L15.728 21.3848M12.1924 17.8492L17.8492 12.1924M12.1924 17.8492C10.6303 16.2871 10.6303 13.7545 12.1924 12.1924M17.8492 12.1924C16.2871 10.6303 13.7545 10.6303 12.1924 12.1924M12.1924 6.53552L6.53552 12.1924M12.1924 6.53552C13.7545 8.09762 13.7545 10.6303 12.1924 12.1924M12.1924 6.53552L9.36401 3.70709M6.53552 12.1924C8.09762 13.7545 10.6303 13.7545 12.1924 12.1924M6.53552 12.1924L3.70715 9.36395M9.36401 3.70709L3.70715 9.36395M9.36401 3.70709L8.65685 3M3.70715 9.36395L3 8.65685"></path>
    </g>
  </svg>
);

const HouseBamzy = (theme) => (
  <svg {...tablerProps} viewBox="0 0 256 256" fill={theme}>
    <g>
      <path d="M129.593,64.314c23.543-30.833,44.788-45.063,54.751-45.063c1.37,0,2.507,0.258,3.386,0.775 c5.324,3.076,6.332,16.619,2.766,34.505c5.686,1.086,11.14,2.326,16.335,3.722c5.583-26.958,1.861-45.619-10.649-52.856 c-12.716-7.34-30.498-1.318-51.434,17.42c-12.018,10.754-24.622,25.416-36.339,42.062c-11.687,0.676-23.237,1.953-34.188,3.813 c-7.913-26.6-7.343-44.886-0.783-48.667c0.879-0.517,2.016-0.775,3.386-0.775c7.289,0,19.255,7.237,32.023,19.385 c3.618-4.471,7.263-8.736,10.907-12.742C97.657,5.036,78.246-2.253,65.013,5.397C52.297,12.712,48.626,31.114,54.39,58.64 c0.901,4.301,2.036,8.788,3.376,13.409C25.626,79.809,2,93.278,2,111.935c0,15.378,16.231,28.637,45.696,37.322l1.241,0.362 l0.362-1.215c1.344-4.42,2.869-8.917,4.523-13.388l0.465-1.292l-1.318-0.388c-20.392-5.97-34.065-14.577-34.065-21.4 c0-7.721,16.139-17.594,44.084-24.042c3.821,10.43,8.516,21.254,13.893,32.034c-8.08,17.761-14.137,35.252-17.321,50.473 c-5.764,27.5-2.094,45.903,10.623,53.217c3.463,2.016,7.366,3.024,11.605,3.024c10.571,0,23.468-6.384,37.606-18.532 c-3.851-3.929-7.625-8.064-11.295-12.38c-10.519,8.891-19.979,14.06-26.105,14.06c-1.344,0-2.481-0.259-3.386-0.776 c-8.213-4.751-7.064-32.19,8.403-70.244c24.572,42.417,63.859,87.871,92.371,87.871c4.239,0,8.141-1.008,11.605-3.024h0.026 c26.285-15.146,10.054-73.998-16.516-123.493c-6.306-1.008-13.207-1.835-20.729-2.43l0.853,1.447 c33.316,57.689,38.795,103.592,27.94,109.872c-0.905,0.517-2.042,0.776-3.386,0.776c-13.13,0-45.98-24.787-77.797-79.891 c-2.015-3.492-3.924-6.939-5.738-10.338c3.243-6.601,6.866-13.421,10.907-20.419c3.659-6.338,7.331-12.256,10.986-17.8 c3.423-0.101,6.903-0.163,10.466-0.163c66.606,0,109.122,18.222,109.122,30.757c0,6.436-12.199,14.448-30.731,20.367 c2.042,5.324,3.903,10.623,5.531,15.843c27.164-8.684,42.078-21.452,42.078-36.21C254,81.266,190.199,64.601,129.593,64.314z M91.919,90.689c-1.915,3.32-3.771,6.67-5.566,10.036c-2.506-5.53-4.744-10.887-6.695-16.017c5.395-0.837,11.099-1.547,17.094-2.107 C95.11,85.272,93.492,87.964,91.919,90.689z M111.783,114.85c0,10.231,8.324,18.555,18.555,18.555 c10.231,0,18.555-8.324,18.555-18.555s-8.324-18.555-18.555-18.555C120.107,96.294,111.783,104.618,111.783,114.85z"></path>
    </g>
  </svg>
);

const HouseWonder = (theme) => (
  <svg {...tablerProps} viewBox="0 0 256 256" fill={theme}>
    <g stroke={theme} strokeWidth='4'>
      <path d="M104.564,63.636l-32.09-18.528c-1.289-0.746-2.877-0.734-4.158,0.024L35.801,64.393 c-1.956,1.158-2.603,3.685-1.444,5.641c0.768,1.297,2.139,2.019,3.547,2.019c0.714,0,1.435-0.185,2.095-0.575l30.443-18.033 l30.005,17.324c1.968,1.134,4.485,0.458,5.625-1.508C107.209,67.291,106.535,64.774,104.564,63.636z"></path>
      <path d="M232.587,52.017l-51.789-29.901c0.229-1.162,0.363-2.36,0.363-3.589C181.16,8.311,172.85,0,162.633,0 c-10.217,0-18.528,8.311-18.528,18.528c0,10.217,8.311,18.528,18.528,18.528c6.03,0,11.344-2.939,14.73-7.413L226.41,57.96 v57.007l-49.367,28.502l-49.368-28.502V55.584c0-1.423-0.766-2.614-1.863-3.354c-0.096-0.067-0.174-0.153-0.276-0.212 l-0.27-0.156c-0.048-0.021-0.085-0.057-0.133-0.077L72.051,21.137c-1.275-0.736-2.843-0.736-4.117,0l-53.485,30.88 c-1.275,0.736-2.059,2.095-2.059,3.566v61.76c0,1.472,0.784,2.831,2.059,3.566l51.466,29.715v61.417 c0,1.472,0.784,2.831,2.059,3.566l53.485,30.88c0.637,0.368,1.347,0.551,2.059,0.551c0.712,0,1.421-0.183,2.059-0.551 l49.726-28.71c3.247,2.801,7.419,4.557,12.034,4.557c10.217,0,18.528-8.311,18.528-18.528c0-10.217-8.311-18.528-18.528-18.528 c-10.217,0-18.528,8.311-18.528,18.528c0,2.605,0.552,5.079,1.526,7.33l-46.816,27.03l-49.367-28.501v-59.087l49.367-28.503 l51.466,29.715c0.637,0.368,1.347,0.551,2.059,0.551c0.711,0,1.421-0.183,2.059-0.551l53.485-30.88 c1.275-0.736,2.059-2.095,2.059-3.566v-61.76C234.644,54.112,233.86,52.753,232.587,52.017z M162.633,28.821 c-5.675,0-10.293-4.618-10.293-10.293s4.618-10.293,10.293-10.293c5.675,0,10.293,4.618,10.293,10.293 S168.308,28.821,162.633,28.821z M187.336,193.513c5.675,0,10.293,4.618,10.293,10.293c0,5.675-4.618,10.293-10.293,10.293 c-2.371,0-4.53-0.838-6.272-2.191c-0.02-0.658-0.143-1.316-0.495-1.926c-0.584-1.008-1.533-1.665-2.582-1.926 c-0.594-1.299-0.945-2.731-0.945-4.25C177.042,198.131,181.66,193.513,187.336,193.513z M69.993,143.469l-49.368-28.502V57.96 l49.367-28.502L119.36,57.96l0.001,57.007L69.993,143.469z"></path>
    </g>
  </svg>
);

const iconMap = {
  News: IconNews,
  Gift: IconGift,
  Jake: IconUser,
  Tricky: IconMoodHappy,
  Robo: IconRobot,
  Yutani: IconSpy,
  Alien: IconAlien,
  Tagbot: IconFaceId,
  Lucia: IconUserSearch,
  Fresh: IconFaceIdError,
  Frank: IconUserEdit,
  Zoe: IconUserCircle,
  King: IconStar,
  Locked: IconLock,
  Jack: IconUser,
  Trick: IconMoodHappy,
  Rob: IconRobot,
  Yutan: IconSpy,
  Alie: IconAlien,
  Tagbo: IconFaceId,
  Luci: IconUserSearch,
  Fres: IconFaceIdError,
  Fran: IconUserEdit,
  Zo: IconUserCircle,
  Kin: IconStar,
  Lock: IconLock,
  Award: IconAward,
  Target: IconTarget,
  Pencil: IconPencil,
  Upload: IconUpload,
  Skateboard: IconSkateboard,
  Coin: IconCoin,
  Flame: IconFlame,
  Box: IconBox,
  Key: IconKey,
  Swords: IconSwords,
  Shield: IconShield,
  Star: IconStar,
  Settings: IconSettings,
  Ticket: IconDiscount2,
  Ankh: IconAnkh,
  Female: IconGenderFemale,
  World: IconWorld,
  Ball: IconBallFootball,
  Field: IconSoccerField,
  Crown: IconCrown,
  Ghost: IconGhost,
  Rocket: IconRocket,
  Moon: IconMoonStars,
  Horse: IconHorseToy,
  Pulse: IconWaveSine,
  Music: IconMusic,
  Tool: IconTool,
  Home: IconHome,
  Team: IconUsersGroup,
  Shop: IconShoppingCart,
  Chat: IconMessages,
  Help: IconHelp,
  Headset: IconHeadset,
}

const logoMap = {
  houseOdin: HouseOdin,
  houseWeber: HouseWeber,
  houseBamzy: HouseBamzy,
  houseWonder: HouseWonder,
};

export default function IconOrImage(parameter, size=24) {
  if (typeof parameter === 'string' && iconMap[parameter]) {
    const IconComponent = iconMap[parameter];
		return IconComponent ? <IconComponent size={size} /> : null;
	} else if (typeof parameter === 'object' && parameter !== null) {
    if (parameter.icon) {
      const IconComponent = () => logoMap[parameter.icon](parameter.theme);
      return IconComponent ? <IconComponent /> : null;
    }
  }
  else { return parameter }
}
