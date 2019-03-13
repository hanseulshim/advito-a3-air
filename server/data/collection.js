exports.locationCollectionList = [
  {
    id: 1,
    name: 'Standard (Advito)',
    description:
      'Standard Advito Location Collection - Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateUpdated: '2019-01-15',
    active: true,
    isDeleted: false,
    regionList: [
      {
        name: 'Africa',
        countryList: [
          'Algeria',
          'Angola',
          'Benin',
          'Botswana',
          'Burkina Faso',
          'Burundi',
          'Cameroon',
          'Cape Verde',
          'Central African Republic',
          'Chad',
          'Comoros',
          'Congo',
          "Cote D'ivoire",
          'Djibouti',
          'Egypt',
          'Equatorial Guinea',
          'Eritrea',
          'Ethiopia',
          'Gabon',
          'Gambia',
          'Ghana',
          'Guinea',
          'Guinea Bissau',
          'Kenya',
          'Lesotho',
          'Liberia',
          'Libya',
          'Madagascar',
          'Malawi',
          'Mali',
          'Mauritania',
          'Mauritius',
          'Mayotte',
          'Morocco',
          'Mozambique',
          'Namibia',
          'Niger',
          'Nigeria',
          'Reunion',
          'Rwanda',
          'Saint Helena, Ascension And Tristan Da Cunha',
          'Sao Tome And Principe',
          'Senegal',
          'Seychelles',
          'Sierra Leone',
          'Somalia',
          'South Africa',
          'South Sudan',
          'Sudan',
          'Swaziland',
          'The Democratic Republic Of The Congo',
          'Togo',
          'Tunisia',
          'Uganda',
          'United Republic Of Tanzania',
          'Western Sahara',
          'Zambia',
          'Zimbabwe'
        ]
      },
      {
        name: 'Antarctica',
        countryList: ['French Southern Territories']
      },
      {
        name: 'Asia',
        countryList: [
          'Bangladesh',
          'Bhutan',
          'Brunei Darussalam',
          'Cambodia',
          'China',
          "Democratic People's Republic Of Korea",
          'Hong Kong',
          'India',
          'Indonesia',
          'Japan',
          'Kazakhstan',
          'Kyrgyzstan',
          "Lao People's Democratic Republic",
          'Macao',
          'Malaysia',
          'Maldives',
          'Mongolia',
          'Myanmar',
          'Nepal',
          'Philippines',
          'Province Of China Taiwan',
          'Republic Of Korea',
          'Singapore',
          'Sri Lanka',
          'Tajikistan',
          'Thailand',
          'Timor Leste',
          'Turkmenistan',
          'Uzbekistan',
          'Viet Nam'
        ]
      },
      {
        name: 'Europe',
        countryList: [
          'Aland Islands',
          'Albania',
          'Andorra',
          'Armenia',
          'Austria',
          'Belarus',
          'Belgium',
          'Bosnia And Herzegovina',
          'Bulgaria',
          'Croatia',
          'Cyprus',
          'Czech Republic',
          'Denmark',
          'Estonia',
          'Faroe Islands',
          'Finland',
          'France',
          'Georgia',
          'Germany',
          'Greece',
          'Guernsey',
          'Hungary',
          'Iceland',
          'Ireland',
          'Isle Of Man',
          'Italy',
          'Jersey',
          'Kosovo',
          'Latvia',
          'Liechtenstein',
          'Lithuania',
          'Luxembourg',
          'Malta',
          'Monaco',
          'Montenegro',
          'Netherlands',
          'Norway',
          'Poland',
          'Portugal',
          'Republic Of Macedonia',
          'Republic of Moldova',
          'Romania',
          'Russian Federation',
          'San Marino',
          'Serbia',
          'Slovakia',
          'Slovenia',
          'Spain',
          'Svalbard And Jan Mayen',
          'Sweden',
          'Switzerland',
          'Turkey',
          'Ukraine',
          'United Kingdom'
        ]
      },
      {
        name: 'Latin America',
        countryList: [
          'Anguilla',
          'Antigua And Barbuda',
          'Argentina',
          'Bahamas',
          'Barbados',
          'Belize',
          'Bermuda',
          'Bonaire, Sint Eustatius And Saba',
          'Brazil',
          'Cayman Islands',
          'Chile',
          'Colombia',
          'Costa Rica',
          'Cuba',
          'Dominica',
          'Dominican Republic',
          'Ecuador',
          'El Salvador',
          'French Guiana',
          'Grenada',
          'Guadeloupe',
          'Guatemala',
          'Guyana',
          'Haiti',
          'Honduras',
          'Jamaica',
          'Martinique',
          'Mexico',
          'Montserrat',
          'Nicaragua',
          'Panama',
          'Paraguay',
          'Peru',
          'Plurinational State Of Bolivia',
          'Puerto Rico',
          'Saint Kitts And Nevis',
          'Saint Lucia',
          'Saint Vincent And The Grenadines',
          'Suriname',
          'Trinidad And Tobago',
          'Uruguay',
          'US Virgin Islands',
          'Venezuela'
        ]
      },
      {
        name: 'Middle East',
        countryList: [
          'Afghanistan',
          'Azerbaijan',
          'Bahrain',
          'Iraq',
          'Islamic Republic Of Iran',
          'Israel',
          'Jordan',
          'Kuwait',
          'Lebanon',
          'Oman',
          'Pakistan',
          'Qatar',
          'Saudi Arabia',
          'State Of Palestine',
          'Syrian Arab Republic',
          'United Arab Emirates',
          'Yemen'
        ]
      },
      {
        name: 'North America',
        countryList: [
          'Canada',
          'Greenland',
          'Saint Pierre And Miquelon',
          'United States of America'
        ]
      },
      {
        name: 'South Pacific',
        countryList: [
          'American Samoa',
          'Australia',
          'Federated States Of Micronesia',
          'Fiji',
          'French Polynesia',
          'Guam',
          'Kiribati',
          'Marshall Islands',
          'Nauru',
          'New Caledonia',
          'New Zealand',
          'Northern Mariana Islands',
          'Palau',
          'Papua New Guinea',
          'Samoa',
          'Solomon Islands',
          'Tokelau',
          'Tonga',
          'Tuvalu',
          'Vanuatu',
          'Wallis And Futuna'
        ]
      }
    ]
  }
];

exports.travelSectorCollectionList = [
  {
    id: 1,
    name: 'Standard (Advito)',
    sectorList: [
      {
        id: 1,
        name: 'TATL (no GB)',
        shortName: 'NA-EUR',
        geographyList: [
          {
            origin: 'US (USA)',
            destination: 'UK (United Kingdom)',
            exclude: true
          },
          {
            origin: 'US (USA)',
            destination: 'EU (Europe)',
            exclude: false
          }
        ]
      },
      {
        id: 2,
        name: 'EMEA - ASPAC',
        shortName: 'EMEA-ASPAC',
        geographyList: [
          {
            origin: 'US (USA)',
            destination: 'UK (United Kingdom)',
            exclude: true
          },
          {
            origin: 'US (USA)',
            destination: 'EU (Europe)',
            exclude: true
          },
          {
            origin: 'US (USA)',
            destination: 'RUS (Russia)',
            exclude: true
          }
        ]
      },
      {
        id: 3,
        name: 'Intra Afr',
        shortName: 'INTRA AFR',
        geographyList: [
          {
            origin: 'US (USA)',
            destination: 'UK (United Kingdom)',
            exclude: true
          }
        ]
      },
      {
        id: 4,
        name: 'Intra Eur (no DE)',
        shortName: 'INTRA EUR',
        geographyList: [
          {
            origin: 'US (USA)',
            destination: 'UK (United Kingdom)',
            exclude: true
          },
          {
            origin: 'US (USA)',
            destination: 'EU (Europe)',
            exclude: true
          },
          {
            origin: 'US (USA)',
            destination: 'RUS (Russia)',
            exclude: true
          },
          {
            origin: 'US (USA)',
            destination: 'CN (China)',
            exclude: false
          }
        ]
      }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateUpdated: '01-25-2019',
    active: true
  }
];

exports.airlineGroupCollectionList = [
  {
    id: 1,
    name: 'Standard (Advito)',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateUpdated: '01-25-2019',
    active: true,
    airlineGroupList: [
      {
        id: 1,
        name: 'Delta JV',
        effectiveStartDate: '01-01-2018',
        effectiveEndDate: '12-31-2019',
        airlineList: [
          {
            name: 'Air France',
            effectiveStartDate: '01-01-2018',
            effectiveEndDate: '12-31-2019'
          }
        ]
      }
    ]
  }
];

exports.preferredAirlineCollectionList = [
  {
    id: 1,
    name: 'Collection 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateUpdated: '01-25-2019',
    active: true,
    airlineList: [
      {
        name: 'Air France',
        preferenceLevel: 'Primary',
        effectiveStartDate: '01-01-2019',
        effectiveEndDate: '12-31-2019',
        cabins: 'F.C.P.Y',
        pos: 'EU',
        active: true
      },
      {
        name: 'Aeroflot',
        preferenceLevel: 'Primary',
        effectiveStartDate: '01-01-2019',
        effectiveEndDate: null,
        cabins: 'F.C.P.Y',
        pos: 'EU',
        active: true
      },
      {
        name: 'Lufthansa',
        preferenceLevel: 'Primary',
        effectiveStartDate: '01-01-2019',
        effectiveEndDate: '12-31-2019',
        cabins: 'F.C.P.Y',
        pos: 'EU',
        active: true
      }
    ]
  }
];
