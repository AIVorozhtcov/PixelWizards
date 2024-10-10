import { ImageWithTextPropsCustom, ProfileDataType } from '../types';

export const createInput = (
  label: ProfileDataType['label'],
  name: ProfileDataType['name'],
  type: ProfileDataType['type'] = 'text'
) => ({
  label,
  name,
  type,
});

export const createLink = (name: string, href: string) => ({
  name,
  href,
});

export const createImageWithText = (
  imgSrc: ImageWithTextPropsCustom['imgSrc'],
  imgAlt: ImageWithTextPropsCustom['imgAlt'],
  subtitle: ImageWithTextPropsCustom['subtitle'],
  text: ImageWithTextPropsCustom['text']
) => ({
  imgSrc,
  imgAlt,
  subtitle,
  text,
});

export const createGameplayText = (subtitle: string, text: string) => ({
  subtitle,
  text,
});
