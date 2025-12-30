import { IconNews, IconGift, IconAward, IconTarget, IconPencil, IconUpload, IconSkateboard, IconHeadset, } from '@tabler/icons-react';
import { IconUser, IconUserEdit, IconUserCircle, IconUserSearch, IconCoin, IconFlame, } from '@tabler/icons-react';
import { IconMoodHappy, IconBox, IconKey, } from '@tabler/icons-react';
import { IconSpy, IconRobot, IconAlien } from '@tabler/icons-react';
import { IconFaceId, IconFaceIdError } from '@tabler/icons-react';
import { IconStar, IconLock } from '@tabler/icons-react';
import { IconBallFootball, IconSoccerField, IconCrown, IconGhost, IconRocket,  } from '@tabler/icons-react';
import { IconTool, IconHome, IconUsersGroup, IconShoppingCart, IconMessages, } from '@tabler/icons-react';
import { IconSwords, IconShield, IconSettings, IconDiscount2, IconAnkh,} from '@tabler/icons-react';
import {  IconGenderFemale, IconWorld, IconMusic, IconHelp, } from '@tabler/icons-react';
import { IconMoonStars, IconHorseToy, IconWaveSine, } from '@tabler/icons-react';

export const iconMap = {
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
};

export default function IconOrImage(parameter, size=24) {
  if (typeof parameter === 'string' && iconMap[parameter]) {
    const IconComponent = iconMap[parameter];
		return IconComponent ? <IconComponent size={size} /> : null;
	} else {
		return parameter
	}
}