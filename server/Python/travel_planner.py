import sys
import json
from langchain.schema import HumanMessage, AIMessage
from langchain.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

# Initialize the LLM (ChatGroq)
llm = ChatGroq(
    temperature=0,
    groq_api_key="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",
    model_name="llama-3.3-70b-versatile"
)

# Define the itinerary prompt using langchain
itinerary_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful travel assistant. Create a day trip itinerary for {city} based on the user's interests: {interests}, dates: {start_date} to {end_date}, total members: {total_members}, and budget: {total_budget} (all in INR). Provide a brief, bulleted itinerary and recommend hotels and food areas with visuals (include emojis)."),
    ("human", "Create an itinerary for my trip."),
])

# Function to process input from stdin
def process_input():
    try:
        input_data = sys.stdin.read().strip()  # Read and strip input

        # If input is empty, raise an error
        if not input_data:
            raise ValueError("No input data received")

        # Parse input as JSON
        input_data = json.loads(input_data)

        # Ensure all required keys are in the input
        required_keys = [
            "city", "interests", "start_date", "end_date", 
            "num_men", "num_women", "num_others", 
            "budget_men", "budget_women", "budget_others", "total_budget"
        ]

        for key in required_keys:
            if key not in input_data:
                raise KeyError(f"Missing required key: {key}")

        return input_data

    except json.JSONDecodeError as e:
        sys.exit(f"JSON Decode Error: {e}")
    except ValueError as e:
        sys.exit(f"Value Error: {e}")
    except KeyError as e:
        sys.exit(f"Key Error: {e}")
    except Exception as e:
        sys.exit(f"An unexpected error occurred: {e}")

# Function to generate the itinerary using the LLM
def generate_itinerary(input_data):
    try:
        # Ensure interests is always formatted as a string
        interests = input_data["interests"]
        if isinstance(interests, list):  # If already a list, join it
            interests = ", ".join(interests)
        elif isinstance(interests, str):  # If string, ensure proper formatting
            interests = ", ".join([item.strip() for item in interests.split(",")])

        # Prepare the prompt with the input data
        response = llm.invoke(itinerary_prompt.format_messages(
            city=input_data["city"],
            interests=interests,
            start_date=input_data["start_date"],
            end_date=input_data["end_date"],
            total_members=int(input_data["num_men"]) + int(input_data["num_women"]) + int(input_data["num_others"]),
            total_budget=input_data["total_budget"]
        ))

        itinerary = response.content
        return itinerary

    except Exception as e:
        sys.exit(f"Error generating itinerary: {e}")

# Main function
if __name__ == "__main__":
    input_data = process_input()  # Get validated input data

    # Generate the itinerary based on the input data
    itinerary = generate_itinerary(input_data)

    # Output the result as JSON
    result = {
        "status": "success",
        "itinerary": itinerary
    }

    # Print the result as JSON to stdout
    print(json.dumps(result))
