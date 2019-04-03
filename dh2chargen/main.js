var character = {
    homeworld: "none",
    background: "none",
    role: "none",
    WS: 0,
    BS: 0,
    S: 0,
    T: 0,
    Ag: 0,
    Int: 0,
    Per: 0,
    WP: 0,
    Fel: 0,
    Infl: 0,
    Wounds: 0,
    Fate: 0,
    Movement: [],
    Fatigue: 0,
    Carry: 0,
    Aptitudes: ["General"],
    Talents: [],
    Equip: [],
    HomeBonus: [],
    BackBonus: [],
    RoleBonus: [],
    CharPlus: [],
    CharMinus: "",
    Experience: 1000
}

var homeworlds = {
    // The homeworld determines a character's characteristics for which they get a bonus or mallus,
    // as well as their fate points, the threshold for getting an additional fate point ("Emperor's Blessing"),
    // their base amount of wounds, a bonus, as well as their first real aptitude.

    "none": {
        aptitude: ""
    },
    "feral": {
        charPlus: ["S", "T"],
        charMinus: "Infl",
        fate: 2,
        blessing: 3,
        wounds: 9,
        bonus: "The Old Ways: A Feral World character's Low-Tech weapons lose any present Primitive Qualities and gain the Proven (3) Quality.",
        aptitude: "Toughness"
    },
    "forge": {
        charPlus: ["Int", "T"],
        charMinus: "Fel",
        fate: 3,
        blessing: 8,
        wounds: 8,
        bonus: "Omnissiah's Chosen: A Forge World character gains the Technical Knock or Weapon-Tech Talent. ",
        aptitude: "Intelligence",
        talent: "Technical Knock ZZ Weapon-Tech"
    },
    "highborn": {
        charPlus: ["Fel", "Infl"],
        charMinus: "T",
        fate: 4,
        blessing: 10,
        wounds: 9,
        bonus: "Breeding Counts: A Highborn character reduces Influence losses by 1, to a minimum loss of 1. ",
        aptitude: "Fellowship"
    },
    "hive": {
        charPlus: ["Ag", "Per"],
        charMinus: "WP",
        fate: 2,
        blessing: 6,
        wounds: 7,
        bonus: "Teeming Masses in Metal Mountains: A Hive World character moves through crowds as if they were open terrain and gains a +20 bonus to Navigate (Surface) Tests in closed spaces. ",
        aptitude: "Perception"
    },
    "shrine": {
        charPlus: ["Fel", "WP"],
        charMinus: "Per",
        fate: 3,
        blessing: 6,
        wounds: 8,
        bonus: "Faith in the Creed: When spending a Fate Point, a Shrine World character's number of Fate Points are not reduced on a 1d10 result of 1.",
        aptitude: "Willpower"
    },
    "voidborn": {
        charPlus: ["Int", "WP"],
        charMinus: "S",
        fate: 3,
        blessing: 5,
        wounds: 7,
        bonus: "Child of the Dark: A voidborn character starts with the Strong Minded talent, and gains a +30 bonus to tests for moving in zero-gravity",
        aptitude: "Intelligence",
        talent: "Strong Minded"
    }
}

var backgrounds = {
    // A character's background provides a further choice in aptitudes, another bonus,
    // as well as some starting skills, talents, and equipment

    // The "ZZ" denotes that the user will have a dropdown to choose which option they'd like.
    // This was used rather than "or" as no strings other than those specifically with choices
    // would have a "ZZ" in them... probably.

    "none": {
        aptitude: "",
        bonus: "",
        skills: [],
        talents: [],
        equipment: []
    },
    "admin": {
        aptitude: "Knowledge ZZ Social",
        bonus: "Master of Paperwork: An Adeptus Administratum character counts the Availability of all items as one level more available (Very Rare items count as Rare, Average items count as Common, etc.)",
        skills: ["Commerce ZZ Medicae", "Common Lore (Adeptus Administratum)", "Linguistics (High Gothic)", "Logic", "Scholastic Lore (Pick One)"],
        talents: ["Weapon Training (Las) ZZ Weapon Training (Solid Projectile)"],
        equipment: ["Laspistol ZZ Stub Automatic", "Imperial Robes", "Autoquill", "Chrono", "Dataslate", "Medi-Kit"]
    },
    "arbite": {
        aptitude: "Offense ZZ Defense",
        bonus: "The Face of the Law: An Arbitrator can intimidation and Interrogation test, and can substitute his Willpower bonus for his degrees of success on these tests.",
        skills: ["Awareness", "Common Lore (Adeptus Arbites)", "Common Lore (Underworld)", "Inquiry ZZ Interrogation", "Intimidate", "Scrutiny"],
        talents: ["Weapon Training (Shock) ZZ Weapon Training (Solid Projectile)"],
        equipment: ["Shotgun ZZ Shock Maul", "Enforcer Light Carapace Armour ZZ Carapace Chest Plate", "3 doses of Stimm", "Manacles", "12 Lho Sticks"]
    },
    "astra": {
        aptitude: "Defense ZZ Psyker",
        bonus: "The Constant Threat: When the character or an ally within 10 meters triggers a roll on the Table 6-2: Psychic Phenomenon (pg 196). Adeptus Astra Telepathica character can increase or decrease the result by amount equal to his Willpower bonus. Tested on Terra: If the character takes the Psyker elite advance during character creation, he also gains the Sanctioned trait (pg 138).",
        skills: ["Awareness", "Common Lore (Adeptus Astra Telepathica)", "Deceive ZZ Interrogation", "Forbidden Lore (the Warp)", "Psyniscience ZZ Scrutiny"],
        talents: ["Weapon Training (Las)", "Weapon Training (Low-Tech)"],
        equipment: ["Laspistol", "Staff ZZ Whip", "Light Flak Cloak ZZ Flak Vest", "Micro-bead ZZ Psy Focus"]
    },
    "admech": {
        aptitude: "Knowledge ZZ Tech",
        bonus: "Replace the Weak Flesh: An Adeptus Mechanicus character counts the Availability of all cybernetics as two levels more available (Rare items count as Average, Very Rare items count as Scarce, etc.).Starting Trait: Mechanicus Implants (pg 137).",
        skills: ["Awareness ZZ Operate (Pick One)", "Common Lore (Adeptus Mechanicus)", "Logic", "Security", "Tech-Use"],
        talents: ["Mechadendrite Use (Utility)", "Weapon Training (Solid Projectile)"],
        equipment: ["Autogun ZZ Hand Cannon", "Monotask Servo-skull (utility) ZZ Optical Mechadendrite", "Imperial Robes", "2 vials of Sacred Unguents"]
    },
    "ministorum": {
        aptitude: "Leadership ZZ Social",
        bonus: "Faith is All: When spending a Fate point to gain a+10 bonus to any one test, an Adeptus Ministorum character gains a +20 bonus instead.",
        skills: ["Charm", "Command", "Common Lore (Adeptus Ministorum)", "Inquiry ZZ Scrutiny", "Linguistics (High Gothic)"],
        talents: ["Weapon Training (Flame) ZZ Weapon Training (Low-Tech, Solid Projectile)"],
        equipment: ["Hand flamer ZZ Warhammer and Stub Revolver", "Imperial Robes ZZ Flak Vest", "Backpack", "Glow-globe", "Monotask Servo-skull"]
    },
    "guard": {
        aptitude: "Fieldcraft ZZ Leadership",
        bonus: "Hammer of the Emperor: When attacking a target that an ally attacked since the end of the Guardsman's last turn, the Guardsman can re-roll any results of 1 or 2 damage rolls. ",
        skills: ["Athletics", "Command", "Common Lore (Imperial Guard)", "Medicae ZZ Operate (Surface)", "Navigate (Surface)"],
        talents: ["Weapon Training (Las)", "Weapon Training (Low-Tech)"],
        equipment: ["Lasgun ZZ Laspistol and Sword", "Combat Vest", "Imperial Guard Flak Armour", "Grapnel and Line", "12 Lho Sticks", "Magnoculars"]
    },
    "outcast": {
        aptitude: "Fieldcraft ZZ Social",
        bonus: "Never Quit: An Outcast character counts his Toughness bonus as two higher for purposes of determining Fatigue.",
        skills: ["Acrobatics ZZ Sleight of Hand", "Common Lore (Underworld)", "Deceive", "Dodge", "Stealth"],
        talents: ["Weapon Training (Chain)", "Weapon Training (Las) ZZ Weapon Training (Solid Projectile)"],
        equipment: ["Autopistol ZZ Laspistol", "Chainsword", "Armoured Body Glove ZZ Flak Vest", "Injector", "2 doses of Obscura ZZ 2 doses of Slaught"]
    }
}

var roles = {
    // A character's role gives them their final pre-set aptitudes, as well as
    // another talent and another bonus

    "none": {
        aptitudes: [],
        talent: "",
        bonus: ""
    },
    "assassin": {
        aptitudes: ["Agility", "Ballistic Skill ZZ Weapon Skill", "Fieldcraft", "Finesse", "Perception"],
        talent: "Jaded ZZ Leap Up",
        bonus: "Sure Kill: In addition to the normal uses of Fate points(pg 293), when an Assassin successfully hits with an attack, he may spend a Fate point to inflict additional damage equal to his degrees of success on the attack roll on the first hit the attack inflicts."
    },
    "chirurgeon": {
        aptitudes: ["Fieldcraft", "Intelligence", "Knowledge", "Strength", "Toughness"],
        talent: "Resistance (Pick One) ZZ Takedown",
        bonus: "Dedicated Healer: In addition to the normal uses of Fate points (pg 293), when a Chirurgeon character fails a test to provide First Aid, he can spend a Fate point to automatically succeed instead with the degrees of success equal to his Intelligence bonus."
    },
    "desperado": {
        aptitudes: ["Agility", "Ballistic Skill", "Defense", "Fellowship", "Finesse"],
        talent: "Catfall ZZ Quick Draw",
        bonus: "Move and Shoot: Once per round, after performing Move action, a Desperado character may perform a single Standard Attack with a Pistol weapon he is currently wielding as a Free Action."
    },
    "hierophant": {
        aptitudes: ["Fellowship", "Offence", "Social", "Toughness", "Willpower"],
        talent: "Double Team ZZ Hatred (Choose Group)",
        bonus: "Sway the Masses: In addition to the normal uses of Fate points (pg 293), a Hierophant character may spend a Fate point to automatically succeed at a Charm, Command, or Intimidate skill test with a number of degrees of success equal to his Willpower bonus. "
    },
    "mystic": {
        aptitudes: ["Defense", "Intelligence", "Knowledge", "Perception", "Willpower"],
        talent: "Resistance (Psychic Powers) ZZ Warp Sense",
        bonus: "Stare into the Warp: A Mystic character starts the game with the Psyker elite advance (pg 90). It is recommended that a character who wishes to be a Mystic have a Willpower of at least 35."
    },
    "sage": {
        aptitudes: ["Intelligence", "Knowledge", "Perception", "Tech", "Willpower"],
        talent: "Ambidextrous ZZ Clues from the Crowds",
        bonus: "Quest for Knowledge: In addition to the normal uses of Fate points (pg 293), a Sage character may spend a Fate point to automatically succeed at a Logic or any Lore skill test with a number of degrees of success equal to his Intelligence bonus."
    },
    "seeker": {
        aptitudes: ["Fellowship", "Intelligence", "Perception", "Social", "Tech"],
        talent: "Keen Intuition ZZ Disarm",
        bonus: "Nothing Escapes My Sight: In addition to the normal uses of Fate points (pg 293), a Seeker character may spend a Fate point to automatically succeed at an Awareness or Inquiry skill test with a number of degrees of success equal to his Perception bonus."
    },
    "warrior": {
        aptitudes: ["Ballistic Skill", "Defense", "Offence", "Strength", "Weapon Skill"],
        talent: "Iron Jaw ZZ Rapid Reload",
        bonus: "Expert at Violence: In addition to the normal uses of Fate points (pg 293), after making a successful attack test, but before determining hits, a Warrior character may spend a Fate point to substitute his Weapon Skill (for melee) or Ballistic Skill (for ranged) bonus for the degrees of success scored on the attack test."
    }
}

var talents = {
    "Technical Knock": {
        tier: 1,
        description: "Un-jam gun as Half Action."
    },
    "Weapon-Tech": {
        tier: 1,
        description: "May enhance any Melta, Plasma, Power, or Exotic weapon by increases the weapon's damage and penetration by an amount equal to the character's Intelligence bonus until the end of the round once per encounter."
    },
    "Strong Minded": {
        tier: 2,
        description: "May reroll failed WP tests to resist psychic powers."
    },
    "Weapon Training (Las)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Solid Projectile)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Low-Tech)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Shock)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Flame)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Chain)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Mechadendrite Use (Utility)": {
        tier: 2,
        description: "Gain ability to use Utility Mechadendrites"
    },
    "Jaded": {
        tier: 1,
        description: "Ignore mundane horrors - dead bodies, xenos abominations, etc. do not cause the Acolyte to gain Insanity points, nor do they require a fear rolls."
    },
    "Leap Up": {
        tier: 1,
        description: "Stand as a Free Action."
    },
    "Resistance (Pick One)": {
        tier: 1,
        description: "Gain +10 bonus to particular resistance test."
    },
    "Takedown": {
        tier: 1,
        description: " 	Make special attack to stun opponent."
    },
    "Catfall": {
        tier: 1,
        description: "Reduces the effective distance of all falls by a number of metres equal to his Agility bonus. Also adds +20 to his Acrobatics skill tests when using Jump"
    },
    "Quick Draw": {
        tier: 1,
        description: "Draw weapon as Free Action."
    },
    "Double Team": {
        tier: 1,
        description: "Gain additional +10 for outnumbering opponent."
    },
    "Hatred (Choose Group)": {
        tier: 1,
        description: "Gain +10 bonus to attack Weapon Skill tests. Must make a Challenging (+0) Willpower test to retreat or surrender."
    },
    "Resistance (Psychic Powers)": {
        tier: 1,
        description: "Gain +10 bonus to psychic power resistance tests."
    },
    "Warp Sense": {
        tier: 1,
        description: "Allows Psyniscience test as Free Action."
    },
    "Ambidextrous": {
        tier: 1,
        description: "When combined with Two-Weapon Wielder, the penalty for attacks with both weapons in the same turn drops to -10."
    },
    "Clues from the Crowds": {
        tier: 1,
        description: "Once per day, re-roll a test made to gather information from a group of people."
    },
    "Keen Intuition": {
        tier: 1,
        description: "Can retry Awareness test once with -10 modifier."
    },
    "Disarm": {
        tier: 1,
        description: "As a Full Action, may make an Opposed Weapon Skill test and force opponent to drop weapon. If 3 or more DoS, can steal weapon."
    },
    "Iron Jaw": {
        tier: 1,
        description: "Test Challenging (+0) Toughness Test to overcome Stunning."
    },
    "Rapid Reload": {
        tier: 1,
        description: "Reload times are halved."
    }
}

var equipment = {
    "Laspistol": {
        "description": "Las Weapon. 30m Range, ROF: S/2/-, 1d10+2 Energy damage, 0 Pen, 30 round clip",
        "weight": "1.5kg"
    },
    "Stub Automatic": {
        "description": "Solid Projectile Weapon. 30m Range, ROF: S/3/-, 1d10+3 Impact damage, 0 pen, 9 round clip",
        "weight": "1.5kg"
    },
    "Imperial Robes": {
        "description": "1 Armour Point, Coverage: Arms, Body, Legs",
        "weight": "4kg"
    },
    "Autoquill": {
        "description": "Grants +10 to recording data",
        "weight": "0kg"
    },
    "Chrono": {
        "description": "Keeps time",
        "weight": "0kg"
    },
    "Dataslate": {
        "description": "Used for data storage and communication - it's a tablet",
        "weight": "0.5kg"
    },
    "Medi-Kit": {
        "description": "Grants +10 bonus to Medicae tests",
        "weight": "2kg"
    },
    "Shotgun": {
        "description": "Solid Projectile weapon. 30m Range, ROF: S/-/-, 1d10+4 Impact damage, 0 pen, 8 round clip",
        "weight": "5kg"
    },
    "Shock Maul": {
        "description": "Shock weapon. Melee range, 1d10+3 Impact damage, 0 pen",
        "weight": "2.5kg"
    },
    "Enforcer Light Carapace Armour": {
        "description": "5 Armour Points, Coverage: All",
        "weight": "15kg"
    },
    "Carapace Chest Plate": {
        "description": "6 Armour Points, Coverage: Body",
        "weight": ""
    },
    "3 doses of Stimm": {
        "description": "Lasts 3d10 rounds and ignores any negative effects from damage, Critical damage, Fatigue, and cannot be stunned. When it wears off, they suffer a -20 to Strength, Toughness, and Agility tests for one hour and gains one level of Fatigue.",
        "weight": ""
    },
    "Manacles": {
        "description": "Handcuffs",
        "weight": "1kg"
    },
    "12 Lho Sticks": {
        "description": "Cigarettes for the grim darkness of the 41st millennium",
        "weight": "0kg"
    },
    "Staff": {
        "description": "Low-Tech weapon. Melee range, 1d10 Impact damage, 0 pen",
        "weight": "3kg"
    },
    "Whip": {
        "description": "Low-Tech weapon. 3m range, 1d10 Rending damage, 0 pen",
        "weight": "2kg"
    },
    "Light Flak Cloak": {
        "description": "2 Armour Points, Coverage: Arms, Body, Legs",
        "weight": "4kg"
    },
    "Flak Vest": {
        "description": "3 Armour Points, Coverage: Body",
        "weight": "5kg"
    },
    "Micro-bead": {
        "description": "Can communicate with other characters using Micro-beads up to 1km away",
        "weight": "0kg"
    },
    "Psy Focus": {
        "description": "Grants +10 to Focus Power tests",
        "weight": "0kg"
    },
    "Autogun": {
        "description": "Solid Projectile weapon. 300m range, ROF: S/3/10, 1d10+3 Impact damage, 0 pen, 30 round clip",
        "weight": "5kg"
    },
    "Hand Cannon": {
        "description": "Solid Projectile weapon. 35m range, ROF: S/-/-, 1d10+4 Impact damage, 2 pen, 5 round clip",
        "weight": "3kg"
    },
    "Monotask Servo-skull (Utility)": {
        "description": "Counts as a Combi-tool (+10 to Tech-Use tests)",
        "weight": "2kg"
    },
    "Optical Mechadendrite": {
        "description": "Grants +10 to all vision-based Perception tests. Has an infrared torch and sensors with a range of 40m, as well as a Stablight (flashlight)",
        "weight": "0kg"
    },
    "2 vials of Sacred Unguents": {
        "description": "Applied to weapon as a full action and becomes immune to jamming for one clip. Can be applied to an already-jammed weapon to immediately clear the jam.",
        "weight": "0kg"
    },
    "Hand Flamer": {
        "description": "Flame weapon. 10m range, ROF: S/-/-, 1d10+4 Energy damage, 2 pen, 2 round clip",
        "weight": "3.5kg"
    },
    "Warhammer and Stub Revolver": {
        "description": "Low-Tech weapon. Melee range, 1d10+3 Impact damage, 1 pen. <br/>Solid Projectile weapon. 30m range, ROF: S/-/-, 1d10+3 Impact damage, 0 pen, 6 round clip",
        "weight": "4.5kg/1.5kg"
    },
    "Backpack": {
        "description": "Allows 30kg of extra carry weight, but items in the Backpack require a full action to retrieve. Can't be worn with a Combat Vest",
        "weight": "2kg"
    },
    "Glow-globe": {
        "description": "Projects light in a 12m radius. Lasts 5 hours",
        "weight": "0.5kg"
    },
    "Monotask Servo-skull (Laud Hailer)": {
        "description": "Records speech and amplifies the user's voice",
        "weight": "2kg"
    },
    "Lasgun": {
        "description": "Las weapon. 100m Range, ROF: S/3/-, 1d10+3 Energy damage, 0 pen, 60 round clip",
        "weight": "4kg"
    },
    "Laspistol and Sword": {
        "description": "Las Weapon. 30m Range, ROF: S/2/-, 1d10+2 Energy damage, 0 Pen, 30 round clip <br/>Low-Tech weapon. Melee range, 1d10 Rending damage, 0 pen",
        "weight": "1.5kg/3kg"
    },
    "Combat Vest": {
        "description": "Carries 15kg of items, which can be drawn in combat as a Free Action. Can't be worn with a Backpack",
        "weight": "2kg"
    },
    "Imperial Guard Flak Armour": {
        "description": "4 Armour Points, Coverage: All",
        "weight": "11kg"
    },
    "Grapnel and Line": {
        "description": "A Clip-harness and Gas powered pistol to shoot a hook and line 100 m away.",
        "weight": "2kg"
    },
    "Magnoculars": {
        "description": "Binoculars",
        "weight": "0.5kg"
    },
    "Autopistol": {
        "description": "Solid Projectile weapon. 30m range, ROF: S/-/6, 1d10+2 Impact damage, 0 pen, 18 round clip",
        "weight": "1.5kg"
    },
    "Chainsword": {
        "description": "Chain weapon. Melee range, 1d10+2 Rending damage, 2 pen",
        "weight": "6kg"
    },
    "Armoured Body Glove": {
        "description": "2 Armour Points, Coverage: Arms, Body, Legs",
        "weight": "5kg"
    },
    "Injector": {
        "description": "Can administer drugs as a Half Action",
        "weight": "0.5kg"
    },
    "2 doses of Obscura": {
        "description": "User enters a dream like state for 1d5 hours. If in combat, consider them under the effects of a Hallucinogen grenade",
        "weight": "0kg"
    },
    "2 doses of Slaught": {
        "description": "User increases Agility and Perception bonus by 3 for 2d10 minutes. When the effect ends, take a toughness test or suffer -20 to Agility and Perception tests for 1d5 hours.",
        "weight": "0kg"
    }
}

// Carry weights are defined in the CRB. They don't appear to follow any sort of logic or reason
var carry = [0.9, 2.25, 4.5, 9, 18, 27, 36, 45, 56, 67, 78, 90, 112, 225, 337, 450, 675, 900, 1350, 1800, 2250];

// Personal use shorthand function
function el(str) {
    return document.getElementById(str);
}

// Takes a number and a range in the form of a string ("10-16") and determines if the number
// falls in that range, inclusive
function inRangeInclusive(num, range) {
    let lowerBound = Number(range.split("-")[0]);
    let upperBound = Number(range.split("-")[1]);

    return (num >= lowerBound && num <= upperBound);
}

// Sums all elements of an array
function sumArr(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}


// Takes a string argument for number of dice to roll ("3d10") and a modifier.
// The modifier is only used for Characteristic rolls.
// A 1 indicates the player has advantage (roll 3 dice, throw away the lowest)
// A -1 indicates they have disadvantage (roll 3 dice, throw away the highest)
function roll(str, mod = 0) {

    if (str == "-") {
        return 1;
    }

    let numRolls = Number(str.split("d")[0]);
    let diceValue = Number(str.split("d")[1]);

    let result = [];

    for (let i = 0; i < numRolls; i++) {
        result.push(Math.floor((Math.random() * diceValue) + 1))
    }

    // Sorts the array of rolls for ease of removing high/low values
    result.sort(function (a, b) {
        return a - b
    })

    if (mod == 1) {
        // Remove lowest value
        result.shift()
    } else if (mod == -1) {
        // Remove highest value
        result.pop()
    }

    let total = sumArr(result);

    return total;
}

function homeChange() {
    var selectBox = el("homeworld");
    var home = selectBox.options[selectBox.selectedIndex].value;
    character.homeworld = home;
    character.CharPlus = homeworlds[home]["charPlus"].slice(0);
    character.CharMinus = homeworlds[home]["charMinus"];

    // HTML ids for the various characteristic labels
    let labels = ["WSLbl", "BSLbl", "SLbl", "TLbl", "AgLbl", "IntLbl", "PerLbl", "WPLbl", "FelLbl", "InflLbl"]


    // Removes any extant coloring
    for (let i = 0; i < labels.length; i++) {
        el(labels[i]).classList.remove("w3-red");
        el(labels[i]).classList.remove("w3-green");
    }

    // If the character has advantage on this characteristic, make the label green
    for (let i = 0; i < character.CharPlus.length; i++) {
        let statLbl = character.CharPlus[i] + "Lbl";
        el(statLbl).classList.add("w3-green");
    }

    // Make the label red if the character has disadvantage
    let malLbl = character.CharMinus + "Lbl";
    el(malLbl).classList.add("w3-red")

    character.fate = homeworlds[home].fate;

    // If a player rolls above their "Emperor's Blessing" number on a d10,
    // they get an additional fate point
    if (roll("1d10") >= homeworlds[home].blessing) {
        character.fate += 1;
        // Turns the fate points green to show the Emperor showed his favor
        el("fate").setAttribute("style", "background: lime;");
    } else {
        el("fate").setAttribute("style", "");
    }

    el("fate").innerHTML = character.fate;

    // Wounds are determined by a base value (from the character's homeworld)
    // plus 1d5
    character.wounds = homeworlds[home].wounds + roll("1d5");
    el("wounds").innerHTML = character.wounds;

    // Populates the list of attributes
    getApts();
    getBonuses();
}

function backChange() {
    var selectBox = el("background");
    var back = selectBox.options[selectBox.selectedIndex].value;
    character.background = back;

    // Populates the list of attributes
    getApts();
    getTalents();
    getEquipment();
    getBonuses();
}

function roleChange() {
    var selectBox = el("role");
    var role = selectBox.options[selectBox.selectedIndex].value;
    character.role = role;

    // Populates the list of attributes
    getApts();
    getTalents();
    getBonuses();
}

function rollChars() {

    // Defines the characteristics
    let chars = ["WS", "BS", "S", "T", "Ag", "Int", "Per", "WP", "Fel", "Infl"]

    for (let i = 0; i < chars.length; i++) {

        if (character.CharPlus.indexOf(chars[i]) == -1 && character.CharMinus != chars[i]) {
            // If the character's homeworld doesn't give them a bonus or a mallus to this characterstic,
            // roll 2d10+20

            character[chars[i]] = roll("2d10") + 20;

        } else if (character.CharPlus.indexOf(chars[i]) != -1) {
            // If the character's homeworld gives them a bonus, roll 3d10 + 20
            // The modifier (1) causes the roll function to throw away the lowest of the 3 rolls

            character[chars[i]] = roll("3d10", 1) + 20;

        } else {
            // If the character's homeworld gives them a mallus, roll 3d10 + 20
            // The modifier (-1) causes the roll function to throw away the highest of the 3 rolls

            character[chars[i]] = roll("3d10", -1) + 20;
        }

        el(chars[i]).innerHTML = character[chars[i]];
    }

    // The character can reroll one single characteristic, once.
    // The reroll buttons are hidden until the player rolls their characteristics
    var rerolls = document.getElementsByClassName("reroll");

    for (let i = 0; i < rerolls.length; i++) {
        rerolls[i].setAttribute("style", "visibility: visible");
    }

    let fatigue = 0

    // Outcast characters get two additional levels towards their fatigue threshold
    if (character.background == "outcast") {
        fatigue = Math.floor(character.T / 10) + 2 + Math.floor(character.WP / 10)
    } else {
        fatigue = Math.floor(character.T / 10) + Math.floor(character.WP / 10)
    }

    el("fatigue").innerHTML = fatigue;

    // Movement is dependent upon the character's AgB (ten's place of their Agility)
    character.Movement[0] = Math.floor(character.Ag / 10);
    character.Movement[1] = Math.floor(character.Ag / 10) * 2;
    character.Movement[2] = Math.floor(character.Ag / 10) * 3;
    character.Movement[3] = Math.floor(character.Ag / 10) * 6;

    el("halfMove").innerHTML = character.Movement[0] + "m";
    el("fullMove").innerHTML = character.Movement[1] + "m";
    el("chargeMove").innerHTML = character.Movement[2] + "m";
    el("runMove").innerHTML = character.Movement[3] + "m";

    // Uses those carry weights from earlier.
    // This is determined by the character's SB + TB
    character.Carry = carry[(Math.floor(character.S / 10) + Math.floor(character.T / 10))]
    el("carryWeight").innerHTML = character.Carry;
}

function reRollChar(str) {
    // The character can reroll one single characteristic, once.
    // The reroll buttons are hidden until the player rolls their characteristics
    if (character.CharPlus.indexOf(str) == -1 && character.CharMinus != str) {
        character[str] = roll("2d10") + 20;
    } else if (character.CharPlus.indexOf(str) != -1) {
        character[str] = roll("3d10", 1) + 20;
    } else {
        character[str] = roll("3d10", -1) + 20;
    }

    el(str).innerHTML = character[str];

    let btnName = str + "btn";

    var rerolls = document.getElementsByClassName("reroll");

    // Hides the reroll buttons once one of them has been used
    for (let i = 0; i < rerolls.length; i++) {
        rerolls[i].setAttribute("style", "visibility: hidden");
    }

    let fatigue = 0;

    if (character.background == "outcast") {
        fatigue = Math.floor(character.T / 10) + 2 + Math.floor(character.WP / 10)
    } else {
        fatigue = Math.floor(character.T / 10) + Math.floor(character.WP / 10)
    }

    try {
        el("fatigue").innerHTML = fatigue;

        character.Movement[0] = Math.floor(character.Ag / 10);
        character.Movement[1] = Math.floor(character.Ag / 10) * 2;
        character.Movement[2] = Math.floor(character.Ag / 10) * 3;
        character.Movement[3] = Math.floor(character.Ag / 10) * 6;
    
        el("halfMove").innerHTML = character.Movement[0] + "m";
        el("fullMove").innerHTML = character.Movement[1] + "m";
        el("chargeMove").innerHTML = character.Movement[2] + "m";
        el("runMove").innerHTML = character.Movement[3] + "m";
    
        character.Carry = carry[(Math.floor(character.S / 10) + Math.floor(character.T / 10))]
        el("carryWeight").innerHTML = character.Carry;
    } catch {

    }    
}



function getApts() {
    // Builds (or re-builds) the character's aptitudes from their
    // homeworld, background, and role
    character.Aptitudes = ["General"];
    character.Aptitudes.push(homeworlds[character.homeworld]["aptitude"]);
    character.Aptitudes.push(backgrounds[character.background]["aptitude"]);
    character.Aptitudes = character.Aptitudes.concat(roles[character.role]["aptitudes"]);

    // Starting with an empty string for the inner HTML of the aptitude table
    let htmlStr = ""

    for (let i = 0; i < character.Aptitudes.length; i++) {

        let str = character.Aptitudes[i];

        // If the aptitude includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td>";

            htmlStr += str;

            htmlStr += "</td></tr>"
        };
    }

    el("aptTable").innerHTML = htmlStr;
}

function getTalents() {
    // Builds (or re-builds) the character's talents from their
    // background and role
    character.Talents = [];
    character.Talents = character.Talents.concat(backgrounds[character.background]["talents"]);
    character.Talents.push(roles[character.role]["talent"]);

    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    for (let i = 0; i < character.Talents.length; i++) {

        let str = character.Talents[i];

        // If the talent includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td>";

            htmlStr += str;

            htmlStr += "</td></tr>"
        };
    }

    el("talents").innerHTML = htmlStr;
}

function getEquipment() {
    // Builds (or re-builds) the character's equipment from their background
    character.Equip = [];
    character.Equip = character.Equip.concat(backgrounds[character.background]["equipment"]);

    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    for (let i = 0; i < character.Equip.length; i++) {

        let str = character.Equip[i];

        // If the talent includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td>";

            htmlStr += str;

            htmlStr += "</td></tr>"
        };
    }

    el("equip").innerHTML = htmlStr;
}

function getBonuses() {
    // Builds (or re-builds) the character's bonuses and
    // special abilities from their homeworld, background, and role
    character.HomeBonus = homeworlds[character.homeworld]["bonus"];
    character.BackBonus = backgrounds[character.background]["bonus"];
    character.RoleBonus = roles[character.role]["bonus"];

    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    htmlStr += "<tr><td>";
    htmlStr += character.HomeBonus;
    // htmlStr += "<hr/>"
    htmlStr += "</tr></td>";

    htmlStr += "<tr><td>";
    htmlStr += character.BackBonus;
    // htmlStr += "<hr/>"
    htmlStr += "</tr></td>";

    htmlStr += "<tr><td>";
    htmlStr += character.RoleBonus;
    // htmlStr += "<hr/>"
    htmlStr += "</tr></td>";

    el("bonus").innerHTML = htmlStr;
}