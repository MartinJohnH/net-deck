const cards = [
  {info: [
      {id: 0},
      {number: "0"},
      {name: 'The Fool'},
      {upright: 'Upright The Fool represents innocence, free spirited wandering and new beginnings.'},
      {reversed: 'Reversed The Fool represents a recklessness and rashness that can come off as inconsiderate and easy to take advantage of and manipulate.'}
    ]
  },
  {info: [
      {id: 1},
      {number: "I"},
      {name: 'The Magician'},
      {upright: 'Upright The Magician represent an inner desire and willpower to create, make and bring to life your creations.'},
      {reversed: 'Reversed: Reversed The Magician represents falling out of touch with reality, illusions and trickery drawing you away from the real.'}
    ]
  },
  {info: [
      {id: 2},
      {number: "II"},
      {name: 'The High Priestess'},
      {upright: 'Upright The High Priestss represents a strong intuitive inner voice that unconsciously keeps you on the right path.'},
      {reversed: 'Reversed The High Priestess represents a repressing of feelings and the loss of an inner voice that keeps you on the right path and a loss of center.'}
    ]
  },
  {info: [
      {id: 3},
      {number: "III"},
      {name: 'The Empress'},
      {upright: 'Upright The Empress represents a strong sense of motherhood, a closeness to nature and fertility of life.'},
      {reversed: 'Reversed The Empress represents a strong dependence on something or a smothering presence that intrudes on yourself. It can also represent an emptiness where that presence would be.'}
    ]
  },
  {info: [
      {id: 4},
      {number: "IV"},
      {name: 'The Emperor'},
      {upright: 'Upright The Emperor represents a strong authority. It is imposed structure and control. It can also represent fatherhood.'},
      {reversed: 'Reversed The Emperor represents a tyrannical rule, over imposing rigidity and the detached coldness of power.'}
    ]
  },
  {info: [
      {id: 5},
      {number: "V"},
      {name: 'The Heirophant'},
      {upright: 'Upright The Heirophant represents a guiding rule of ethics and morality. It can also represent conformity and strong tradition.'},
      {reversed: 'Reversed The Heirophant represent a subversiveness or rebellion to imposed structure. It can also represent new approaches and an open mind.'}
    ]
  },
  {info: [
      {id: 6},
      {number: "VI"},
      {name: 'The Lovers'},
      {upright: 'Upright The Lovers represent strong partnerships and a union of parts, but also the duality involved in the parts of a whole.'},
      {reversed: 'Reversed The Lovers represent a one-sidedness or disharmony in a union and a loss of balance.'}
    ]
  },
  {info: [
      {id: 7},
      {number: "VII"},
      {name: 'The Chariot'},
      {upright: 'Upright The Chariot represents absolute impression of control and willpower, and a strong and clear sense of direction.'},
      {reversed: 'Reversed The Chariot represents a lack of direction, a lack of control and unchecked aggression.'}
    ]
  },
  {info: [
      {id: 8},
      {number: "VIII"},
      {name: 'Strength'},
      {upright: 'Upright Strength represents an inner strength and bravery. It also denotes a strong focus and sense of compassion.'},
      {reversed: 'Reversed Strength represents insecurity and self doubt, and a weakness of self.'}
    ]
  },
  {info: [
      {id: 9},
      {number: "IX"},
      {name: 'The Hermit'},
      {upright: 'Upright The Hermit represents a search for truth and inner guidance, and moments of contemplation.'},
      {reversed: 'Reversed The Hermit represents a losing of your way and falling prey to loneliness and isolation.'}
    ]
  },
  {info: [
      {id: 10},
      {number: "X"},
      {name: 'The Wheel of Fortune'},
      {upright: 'Upright The Wheel of Fortune represents an inevitable fate. It can also represent cycles and changes.'},
      {reversed: 'Reversed The Wheel of Fortune represents bad luck and loss of control or no control. It can also represent clinging to control or structure.'}
    ]
  },
  {info: [
      {id: 11},
      {number: "XI"},
      {name: 'Justice'},
      {upright: 'Upright Justice represents clarity and truth. It can also represent a clear cause and effect.'},
      {reversed: 'Reversed Justice represents a strong unfairness or unaccountability for actions, and dishonesty.'}
    ]
  },
  {info: [
      {id: 12},
      {number: "XII"},
      {name: 'The Hanged Man'},
      {upright: 'Upright The Hanged Man represents sacrifice and martyrdom. It can also symbolise release and letting go.'},
      {reversed: 'Reversed The Hanged Man represents stalling from important decisions and the fear of sacrifice, or needless sacrifice for a cause.'}
    ]
  },
  {info: [
      {id: 13},
      {number: "XIII"},
      {name: 'Death'},
      {upright: ' Upright: Upright The Fool represents innocence, free spirited wandering and new beginnings'},
      {reversed: 'Reversed Death represents a fear of change or holding on to past things.'}
    ]
  },
  {info: [
      {id: 14},
      {number: "XIV"},
      {name: 'Temperance'},
      {upright: 'Upright Temperance represents finding the middle path, being patient and finding meaning in things.'},
      {reversed: 'Reversed Temperance represents a lack of balance in life, excess in things and jumping to extremes.'}
    ]
  },
  {info: [
      {id: 15},
      {number: "XV"},
      {name: 'The Devil'},
      {upright: 'Upright The Devil Represents addiction, materialism and playfulness in life.'},
      {reversed: 'Reversed The Devil Represents finding release and freedom, or restoring control to life.'}
    ]
  },
  {info: [
      {id: 16},
      {number: "XVI"},
      {name: 'The Tower'},
      {upright: 'Upright The Tower represent a sudden upheaval or change in life. It can also represent broken pride or unmitigated disaster.'},
      {reversed: 'Reversed The Tower represents the delaying or avoidance of disaster, or the looming fear of one.'}
    ]
  },
  {info: [
      {id: 17},
      {number: "XVII"},
      {name: 'The Star'},
      {upright: 'Upright The Star represents a rejuvenating presence or the presence of faith and hope.'},
      {reversed: 'Reversed The Star represents feelings of discouragement, insecurity or faithlessness.'}
    ]
  },
  {info: [
      {id: 18},
      {number: "XVIII"},
      {name: 'The Moon'},
      {upright: 'Upright The Moon represents unconscious feeling, intuition or the presence of illusions.'},
      {reversed: 'Reversed The Moon represents misinterpretation of events, confusion and fear.'}
    ]
  },
  {info: [
      {id: 19},
      {number: "XIX"},
      {name: 'The Sun'},
      {upright: 'Upright The Sun represents joy and positivity, or success and celebration.'},
      {reversed: 'Reversed The Sun represents negativity and sadness, sometimes even depression.'}
    ]
  },
  {info: [
      {id: 20},
      {number: "XX"},
      {name: 'Judgement'},
      {upright: 'Upright Judgement represents an awakening or a reckoning of things, or an inward reflection.'},
      {reversed: 'Reversed Judgement represents a lack of self awareness or self loathing. It can also represent doubt.'}
    ]
  },
  {info: [
      {id: 21},
      {number: "XXI"},
      {name: 'The World'},
      {upright: 'Upright The World represent fulfillment and completion, or harmony in things.'},
      {reversed: 'Reversed The World represents a lack of closure or things left incomplete.'}
    ]
  }
];

export default cards;