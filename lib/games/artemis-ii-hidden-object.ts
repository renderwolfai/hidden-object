import { Game } from '@/types/game';

export const artemisIIGame: Game = {
  id: '2026-artemis-ii',
  title: 'Artemis II - To the Moon',
  description: `As humans head to the moon once again with Artemis II, find all the mission-related hidden objects in this image before the timer runs out!`,
  type: 'hidden-object',
  backgroundPath: '/static/artemis-ii-hidden-object/background_final.png',
  bannerPath: 'https://www.hidden.renderwolf.ai/static/artemis-ii-hidden-object/banner_final.png',
  difficulty: 'medium',
  timeLimit: 30,
  shareText: `As humans head to the moon once again with Artemis II, can you find all the mission-related hidden objects in this game by @renderwolfai?`,
  showInLobby: true, // Show this game in the lobby
  showObjectDescriptions: true,
  showUnfoundObjects: true,
  showFoundObjectsOnComplete: true,
  objects: [
    {
       id: 'object-1',
       name: 'Heat Shield Tile',
       description: 'A hexagonal block of ablative resin designed to char and melt, protecting Orion from 2,760°C reentry temperatures.',
       maskPath: '/static/artemis-ii-hidden-object/heat_shield_tile.png'
     },
     {
       id: 'object-2',
       name: 'O2O Telescope',
       description: 'A 4-inch optical telescope using infrared lasers to beam 4K video from the Moon at 260 Mbps.',
       maskPath: '/static/artemis-ii-hidden-object/telescope.png'
     },
     {
       id: 'object-3',
       name: 'Maple Leaf Patch',
       description: 'Represents Jeremy Hansen, the first Canadian and non-American to ever leave Earth\'s orbit for the Moon.',
       maskPath: '/static/artemis-ii-hidden-object/leaf.png'
     },
     {
       id: 'object-4',
       name: 'RS-25 Rocket Engine',
       description: 'One of four core engines. The Artemis II set are refurbished veterans of over 20 shuttle missions.',
       maskPath: '/static/artemis-ii-hidden-object/engine.png'
     },
     {
       id: 'object-5',
       name: 'Free Return Trajectory',
       description: 'A "figure-8" orbital path that uses the Moon’s gravity to naturally slingshot the Orion capsule back to Earth.',
       maskPath: '/static/artemis-ii-hidden-object/tablet.png'
     },
  ]
};

