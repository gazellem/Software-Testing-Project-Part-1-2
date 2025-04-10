const LoginPageModel = require('../pageObjects/LoginPageModel.page');
const SurveyPageModel = require('../pageObjects/SurveyPageModel.page');

describe('Survey Test Case 1 - Submit button display behavior', () => {

    before(async () => {
        await driver.launchApp();
        // Login 
        await LoginPageModel.submitLoginForm('test123@yopmail.com', 'pass123');
    });

    /**
     * Test Case 1: 
     * Unless all mandatory fields are filled with valid values, Submit button should be disabled.
     */
    it('Test Case1: Submit button shall be displayed as enabled if all mandatory fields are filled', async () => {
        // All mandatory fields are empty
        // Survey button is expected to be displayed as disabled.
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // Step1: Fill name field with valid value
        await SurveyPageModel.fillSurveyFields({ name: 'Jennifer Nightingale' });
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // Step2: Fill birthdate field with valid value
        await SurveyPageModel.fillSurveyFields({ birthDate: '1990-01-01' });
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // Step3: Fill prosCons field with valid value
        await SurveyPageModel.fillSurveyFields({ prosCons: 'Pros: Good Structural Flow Cons: Bad User Interface' });
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // Step4: Fill educationLevel field with valid value
        await SurveyPageModel.fillSurveyFields({ educationLevel: 'University' });
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // Step5: Fill gender field with valid value
        await SurveyPageModel.fillSurveyFields({ gender: 'Female' });
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // Step6: Fill city field with valid value
        await SurveyPageModel.fillSurveyFields({ city: 'Istanbul' });
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // Step7: Fill aiModelType field with valid value
        await SurveyPageModel.fillSurveyFields({ aiModelType: 'ChatGPT' });
        await expect(SurveyPageModel.buttonSubmit).toBeEnabled();

        // All mandatory fields are filled.
        // Let's assume this optional field is also filled.
        await SurveyPageModel.fillSurveyFields({ beneficialUseCase: 'User Interface Improvements' });

        // all fields are filled in valid values,
        // Submit button should be displayed as enabled.
        await expect(SurveyPageModel.buttonSubmit).toBeEnabled();
    });
/**
     * Test Case 2: 
     * Unless all mandatory fields are filled with valid values, Submit button should be disabled.
     */

    it('Test Case2: Invalid characters shall not be allowed in name, birthDate, and city fields', async () => {
        // Test Step1
        // Condition: Set name field with numerical value.
        await SurveyPageModel.fillSurveyFields({ name: 'Jennifer123 Nightingale' });
        
        // Expected Result
         const nameError = await $('~errorNameInvalid');
         await expect(nameError).toBeDisplayed();

        // Test step2
        // Condition: Set name field with alphanumerical character
         await SurveyPageModel.fillSurveyFields({ name: 'Jennifer/Nightingale' });
        // Expected Result
         const nameError2 = await $('~errorNameInvalid');
         await expect(nameError2).toBeDisplayed();

        // Test Step3
        // Condition: Set birthDate field with alphanumerical value other than '/' and '.'.
         await SurveyPageModel.fillSurveyFields({ birthDate: '04"11"1995' });
        
        // Expected Result
         const birthDateError = await $('~errorBirthDateInvalid');
         await expect(birthDateError).toBeDisplayed();
        
        // Test Step4
        // Condition: Set birthDate field with alphabetical char.
        await SurveyPageModel.fillSurveyFields({ birthDate: 'AA.AA.AAAA' });
        
        // Expected Result
         const birthDateError2 = await $('~errorBirthDateInvalid');
         await expect(birthDateError2).toBeDisplayed();

        // Test step5
        // Condition: Set city field with alphanumerical character
        await SurveyPageModel.fillSurveyFields({ city: 'Ankara//' });
        // Expected Result
         const cityError = await $('~errorCityInvalid');
         await expect(cityError).toBeDisplayed();

        // Test Step6
        // Condition: Set city field with numerical value
         await SurveyPageModel.fillSurveyFields({ city: 'Ankara2' });
        
        // Expected Result
         const cityError2 = await $('~errorCityInvalid');
         await expect(cityError2).toBeDisplayed();
    });

    /**
     * Test Case 3:
     * Age of the survee cannot be under 18.
     */
    it('Test Case3: Survee age shall not be below 18', async () => {

        await SurveyPageModel.fillSurveyFields({ 
            name: 'Jennifer Nightingale',
            birthDate: '2009-01-01',  // A birthDate that is under age 18.
            prosCons: 'Pros: Good Interface / Cons: Bad Structure',
            educationLevel: 'HighSchool',
            gender: 'Female',
            city: 'Istanbul',
            aiModelType: 'ChatGPT'
            // beneficialUseCase was optional therefore not needed.
        });

        // Expected Result: App shall not accept and throw an error.
        const underAgeError = await $('~errorBirthDateAgeInvalid');
        await expect(underAgeError).toBeDisplayed();

        // submit button shall not be displayed as enabled.
        await expect(SurveyPageModel.buttonSubmit).toBeDisabled();

        // when all fields are valid, submit button is displayed as enabled.
        await SurveyPageModel.fillSurveyFields({
            birthDate: '1990-01-01'
        });

        await expect(underAgeError).not.toBeDisplayed();
        await expect(SurveyPageModel.buttonSubmit).toBeEnabled();
    });

    /**
     * Test Case 4:
     * BeneficialUseCase and prosCons fields must be between 10 and 250 characters.
     */
    it('Test Case4: BeneficialUseCase and prosCons fields must have a length between 10 and 250 characters', async () => {
        // Boundary test min-1 value
        await SurveyPageModel.fillSurveyFields({ prosCons: 'abcdefghj' });
        const prosConsError = await $('~errorProsConsLength');
        await expect(prosConsError).toBeDisplayed();

        await SurveyPageModel.fillSurveyFields({ beneficialUseCase: 'abcdefghj' });
        const beneficialError = await $('~errorBeneficialUseCaseLength');
        await expect(beneficialError).toBeDisplayed();

        // Boundary test max+1 value
        const boundaryMaxPlus1 = 'a'.repeat(251);
        await SurveyPageModel.fillSurveyFields({ prosCons: boundaryMaxPlus1 });
        await expect(prosConsError).toBeDisplayed();

        await SurveyPageModel.fillSurveyFields({ beneficialUseCase: boundaryMaxPlus1 });
        await expect(beneficialError).toBeDisplayed();

        // Geçerli sınır testleri: Minimum 10 karakter ve maksimum 250 karakter
        const boundaryMin = 'a'.repeat(10);
        await SurveyPageModel.fillSurveyFields({ prosCons: boundaryMin });
        await expect(prosConsError).not.toBeDisplayed();

        await SurveyPageModel.fillSurveyFields({ beneficialUseCase: boundaryMin });
        await expect(beneficialError).not.toBeDisplayed();

        const boundaryMax = 'b'.repeat(250);
        await SurveyPageModel.fillSurveyFields({ prosCons: boundaryMax });
        await expect(prosConsError).not.toBeDisplayed();

        await SurveyPageModel.fillSurveyFields({ beneficialUseCase: boundaryMax });
        await expect(beneficialError).not.toBeDisplayed();

        // Submit button shall be displayed as enabled.
        await expect(SurveyPageModel.buttonSubmit).toBeEnabled();
    });

    /**
     * Test Case 5:
     * User has already submitted a survey.
     * When a user who has already submitted a survey and visits 
     * the UI shall indicate that the survey was already submitted.
     */
    it('Test Case5: Survey submission - User has already submitted a survey', async () => {
        
        // First submission
        await SurveyPageModel.fillSurveyFields({ 
            name: 'Jennifer Nightingale',
            birthDate: '1990-01-01', 
            prosCons: 'Pros: Good Interface / Cons: Bad Structure',
            educationLevel: 'University',
            gender: 'Female',
            city: 'Istanbul',
            aiModelType: 'ChatGPT',
            beneficialUseCase: 'Good aiModelType, well done.'
        });

        // Click submit button.
        await SurveyPageModel.buttonSubmit.click();

        // Second submission
        await SurveyPageModel.fillSurveyFields({ 
            name: 'Jennifer Nightingale',
            birthDate: '1990-01-01', 
            prosCons: 'Pros: Good Interface / Cons: Bad Structure',
            educationLevel: 'University',
            gender: 'Female',
            city: 'Istanbul',
            aiModelType: 'ChatGPT',
            beneficialUseCase: 'Good aiModelType, well done.'
        });

        // Click submit button.
        await SurveyPageModel.buttonSubmit.click();

        const alreadySubmittedMessage = await $('~alreadySubmittedMessage');
        await expect(alreadySubmittedMessage).toBeDisplayed();

    });

    after(async () => {
        // Clean up and then close.
        await driver.closeApp();
    });


});
