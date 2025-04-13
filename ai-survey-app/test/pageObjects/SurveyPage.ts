import { $ } from '@wdio/globals';

type SurveyFormFields = {
  name?: string;
  birthDate?: string;
  educationLevel?: string;
  city?: string;
  gender?: string;
  aiModelType?: string;
  prosCons?: string;
  beneficialUseCase?: string;
};

class SurveyPage {
    //* Getting input fields name, birthDate, educationLevel, city, gender, AI model/type, prosCons, beneficialUseCase 
    //  from login.ts using getter */
    get inputName() {
         return $('~inputName-Survey'); // inputName-Survey is testID from survey.ts.
    }
    get inputBirthDate() {
         return $('~inputBirthDate-Survey');    // inputBirthDate-Survey is testID from survey.ts.
    }
    get selectEducationLevel() {
        return $('~selectEducationLevel-Survey');    // selectEducationLevel-Survey is testID from survey.ts.
    } 
    get inputCity() { 
        return $('~inputCity-Survey');      // inputCity-Survey is testID from survey.ts.
    }  
    get selectGender() {
        return $('~selectGender-Survey');       // selectGender-Survey is testID from survey.ts.
    } 
    get selectAIModelType() {
         return $('~selectAIModelType-Survey');     // selectAIModelType-Survey is testID from survey.ts.
    }    
    get inputProsCons() {
        return $('~inputProsCons-Survey');     // inputProsCons-Survey is testID from survey.ts.
    }
    get inputBeneficialUseCase() {
        return $('~inputBeneficialUseCase-Survey');     // inputBeneficialUseCase-Survey is testID from survey.ts.
    }
    get buttonSubmit() {
         return $('~buttonSubmit-Survey');      // buttonSubmit-Survey is testID from survey.ts.
    }    

    /**
     * this method is used to create re-usable standard to fill survey entries.
     */
    async fillSurveyFields({
        name,
        birthDate,
        educationLevel,
        city,
        gender,
        aiModelType,
        prosCons,
        beneficialUseCase
    }: SurveyFormFields): Promise<void> {
        if (name !== undefined) await this.inputName.setValue(name);
        if (birthDate !== undefined) await this.inputBirthDate.setValue(birthDate);
        if (educationLevel !== undefined) {
            // selection of education level field.
            await this.selectEducationLevel.click();
            const educationLevelOption = await $(`~option-${educationLevel}`);
            await educationLevelOption.click();
        }
        if (city !== undefined) await this.inputCity.setValue(city);
        if (gender !== undefined) {
            // selection of gender field.
            await this.selectGender.click();
            const genderOption = await $(`~option-${gender}`);
            await genderOption.click();
        }
        if (aiModelType !== undefined) {
            // selection of aiModelType field.
            await this.selectAIModelType.click();
            const aiModelTypeOption = await $(`~option-${aiModelType}`);
            await aiModelTypeOption.click();
        }
        if (prosCons !== undefined) await this.inputProsCons.setValue(prosCons);
        if (beneficialUseCase !== undefined) await this.inputBeneficialUseCase.setValue(beneficialUseCase);
        
    }
}


export default new SurveyPage();