class SurveyPageModel {
    //* Getting input fields name, birthDate, educationLevel, city, gender, AI model/type, prosCons, beneficialUseCase 
    //  from login.jsx using getter */
    get inputName() {
         return $('~inputName-Survey'); // inputName-Survey is testID from survey.jsx.
    }
    get inputBirthDate() {
         return $('~inputBirthDate-Survey');    // inputBirthDate-Survey is testID from survey.jsx.
    }
    get selectEducationLevel() {
        return $('~selectEducationLevel-Survey');    // selectEducationLevel-Survey is testID from survey.jsx.
    } 
    get inputCity() { 
        return $('~inputCity-Survey');      // inputCity-Survey is testID from survey.jsx.
    }  
    get selectGender() {
        return $('~selectGender-Survey');       // selectGender-Survey is testID from survey.jsx.
    } 
    get selectAIModelType() {
         return $('~selectAIModelType-Survey');     // selectAIModelType-Survey is testID from survey.jsx.
    }    
    get inputProsCons() {
        return $('~inputProsCons-Survey');     // inputProsCons-Survey is testID from survey.jsx.
    }
    get inputBeneficialUseCase() {
        return $('~inputBeneficialUseCase-Survey');     // inputBeneficialUseCase-Survey is testID from survey.jsx.
    }
    get buttonSubmit() {
         return $('~buttonSubmit-Survey');      // buttonSubmit-Survey is testID from survey.jsx.
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
    }) {
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

module.exports = new SurveyPageModel();