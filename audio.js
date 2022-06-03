const shootAudio = new Howl({
  src: './audio/Basic_shoot_noise.wav',
  volume: 0.1
})
const damageTakenAudio = new Howl({
  src: './audio/Damage_taken.wav',
  volume: 0.1
})
const enemyKillAudio = new Howl({
  src: './audio/Explode.wav',
  volume: 0.1
})

const audio = {
  shoot: new Howl({
    src: './audio/Basic_shoot_noise.wav',
    volume: 0.1
  }),
  damage: new Howl({
    src: './audio/Damage_taken.wav',
    volume: 0.1
  }),
  destroy: new Howl({
    src: './audio/Explode.wav',
    volume: 0.1
  })

}