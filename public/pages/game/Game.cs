using UnityEngine;
using UnityEngine.UI;

public class SentenceToTextFields : MonoBehaviour
{
    public GameObject textFieldPrefab; // Assign your Text or InputField prefab in the Inspector
    public Transform textFieldsContainer; // Assign a parent container for layout purposes

    private void Start()
    {
        CreateTextFieldsForSentence("This is an example sentence.");
    }

    private void CreateTextFieldsForSentence(string sentence)
    {
        string[] words = sentence.Split(' ');

        foreach (string word in words)
        {
            GameObject textField = Instantiate(textFieldPrefab, textFieldsContainer);
            if (textField.GetComponent<Text>() != null)
            {
                textField.GetComponent<Text>().text = word;
            }
            else if (textField.GetComponent<InputField>() != null)
            {
                textField.GetComponent<InputField>().text = word;
            }
        }
    }
}