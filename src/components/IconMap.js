import { IconNews, IconGift, IconAward, IconTarget, IconPencil, IconUpload, IconSkateboard, IconSwords, IconShield } from '@tabler/icons-react';
import { IconUser, IconUserEdit, IconUserCircle, IconUserSearch, IconCoin, IconFlame, } from '@tabler/icons-react';
import { IconMoodHappy, IconBox, IconKey, } from '@tabler/icons-react';
import { IconSpy, IconRobot, IconAlien } from '@tabler/icons-react';
import { IconFaceId, IconFaceIdError } from '@tabler/icons-react';
import { IconStar, IconLock } from '@tabler/icons-react';

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
};

export default function IconOrImage(parameter) {
	if (typeof parameter === 'string' && iconMap[parameter]) {
		const IconComponent = iconMap[parameter];
		return IconComponent ? <IconComponent size={24} /> : null;
	} else {
		return parameter
	}
}