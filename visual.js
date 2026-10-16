s0.initImage("https://media.discordapp.net/attachments/1434519157105491968/1560187306604896296/pleasurekiller.png?ex=6ad1cd28&is=6ad07ba8&hm=00f15a732cc0583489c5d8491947a71bd10e5622c73540e2469397eec3bc03d4&=&format=webp&quality=lossless")
speed = 50;

// bg visual
voronoi(4, 10, 0.3)
// noise(30000)
.kaleid(100)
.kaleid(10)
.color([0, 1, 1], [1, 0, 1])
//rightness()
// .thresh(0.100, 0.500)
//.luma(0.1, 0.2)
// .posterize([5], 0.5)
// .pixelate(100, 100)
// .saturate(1)

// logo config / setting
  .layer(
    src(s0)
      .mask(shape(4, 1, 0.001))
      .scale(0.45, () => window.innerWidth / window.innerHeight, 0.5)
  )
  .out(o0)
