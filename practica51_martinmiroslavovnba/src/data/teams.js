export const TEAMS = [
  {
    id: '1',
    name: 'Lakers',
    city: 'Los Angeles',
    color: '#FDB927',
    secondaryColor: '#552583',
    // Usamos require con la ruta relativa
    logo: require('../../assets/logos/lakers.png'), 
    players: ['Magic Johnson', 'Byron Scott', 'James Worthy', 'Sam Perkins', 'Vlade Divac'],
  },
  {
    id: '2',
    name: 'Bulls',
    city: 'Chicago',
    color: '#CE1141',
    secondaryColor: '#000000',
    logo: require('../../assets/logos/bulls.png'),
    players: ['B.J. Armstrong', 'Michael Jordan', 'Scottie Pippen', 'Horace Grant', 'Bill Cartwright'],
  },
  {
    id: '3',
    name: 'Celtics',
    city: 'Boston',
    color: '#007A33',
    secondaryColor: '#BA9653',
    logo: require('../../assets/logos/celtics.png'),
    players: ['Dee Brown', 'Reggie Lewis', 'Larry Bird', 'Kevin McHale', 'Robert Parish'],
  },
];