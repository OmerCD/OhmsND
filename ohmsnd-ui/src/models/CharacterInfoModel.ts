export interface CharacterInfoModel {
    ownerId: string;
    firstName: string;
    lastName: string;
    passiveSkills: PassiveSkillsDto;
    level: number;
    classes: CharacterClassDto[];
    initiative: number;
    gender: GenderDto;
    attributes: AttributesDto;
    skills: SkillsDto;
    immunities: string[];
    resistances: string[];
    weaknesses: string[];
    armorClassBase: number;
    maxHealth: number;
    currentHealth: number;
}

export interface AttributesDto {
    strength: AttributeDto;
    dexterity: AttributeDto;
    constitution: AttributeDto;
    intelligence: AttributeDto;
    wisdom: AttributeDto;
    charisma: AttributeDto;
}

export interface AttributeDto {
    score: number;
    modifier: number;
}

export interface PassiveSkillsDto {
    perception: SkillDto;
    investigation: SkillDto;
    insight: SkillDto;
}

export interface CharacterClassDto {
    level: number;
    indexName: string;
}

export enum GenderDto {
    Male,
    Female
}

export interface SkillsDto {
    acrobatics: SkillDto;
    animalHandling: SkillDto;
    arcana: SkillDto;
    athletics: SkillDto;
    deception: SkillDto;
    history: SkillDto;
    insight: SkillDto;
    intimidation: SkillDto;
    investigation: SkillDto;
    medicine: SkillDto;
    nature: SkillDto;
    perception: SkillDto;
    performance: SkillDto;
    persuasion: SkillDto;
    religion: SkillDto;
    sleightOfHand: SkillDto;
    stealth: SkillDto;
    survival: SkillDto;
}

export interface SkillDto {
    hasProficiency: boolean;
    hasExpertise: boolean;
    indexName: string;
    baseAttributeModifier: number;
    bonusModifier: number;
    skillModifier: number;
}
