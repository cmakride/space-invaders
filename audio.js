const audio = {
  shoot: new Howl({
    src: './audio/Basic_shoot_noise.wav',
    volume: 0.06
  }),
  damage: new Howl({
    src: './audio/Damage_taken.wav',
    volume: 0.1
  }),
  destroy: new Howl({
    src: './audio/Explode.wav',
    volume: 0.1
  }),
  death: new Howl({
    src: './audio/Death.wav',
    volume: 0.1
  }),
  powerup: new Howl({
    src: './audio/Powerup_noise.wav',
    volume: 0.1
  }),
  select: new Howl({
    src: './audio/Select.wav',
    volume: 0.1
  }),
  background: new Howl({
    src: './audio/Hyper.wav',
    volume: 0.1,
    loop: true
  })


}