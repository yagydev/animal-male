import CattleRefContent from "@/constants/cattle-ref-content";
const findAnimalGender = (type: string) => {
    const animalTypeSelected = CattleRefContent?.type?.filter(
        (item: any) => item.code === type
    );
    return animalTypeSelected && animalTypeSelected[0]?.gender
}

export default findAnimalGender;