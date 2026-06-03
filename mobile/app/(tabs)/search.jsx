import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MealAPI } from '../../services/mealAPI';
import { useDebounce } from '../../hooks/useDebounce';

import { searchStyles } from '../../assets/styles/search.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import RecipesCard from '../../components/RecipesCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const searchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const performSearch = async (query) => {
    //no search query, skip search
    if(!query.trim()){
      const randomMeals = await MealAPI.getRandomMeals(10)
      return randomMeals.map(meal => MealAPI.transformMealData(meal))
      .filter(meal => meal !== null);
    }

    //search by name, then ingredients if no results
    const searchByName = await MealAPI.searchMealByName(query);
    let results = searchByName;

    if(results.length === 0){
      const searchByIngredient = await MealAPI.filterByIngredient(query);
      results = searchByIngredient;
    }
    return results
      .slice(0, 10)
      .map((meal) => MealAPI.transformMealData(meal))
      .filter((meal) => meal !== null);
  };

  useEffect(() => {
    const loadingInitialData = async () => {
      try {
        const results = await performSearch("");
        setRecipes(results);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setInitialLoad(false);
      }
    }

    loadingInitialData();
  }, []);

  useEffect(() => {
    if (initialLoad) return;

    const handleSearch = async () => {
      setLoading(true);
      try {
        const results = await performSearch(debouncedSearchQuery);
        setRecipes(results);
      } catch (error) {
        console.error("Error performing search:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    handleSearch();
  }, [debouncedSearchQuery, initialLoad]);

  if(initialLoad) return <LoadingSpinner message="Loading..." />

  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput
            style={searchStyles.searchInput}
            placeholder="Search Recipes..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} style={searchStyles.clearButton}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsHeader}>
          <Text style={searchStyles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : "Popular Recipes"}
          </Text>
          <Text style={searchStyles.resultsCount}>{recipes.length} Found</Text>
        </View>
        {loading ? (
          <View style={searchStyles.loadingContainer}>
            <Text>Loading...</Text>
          </View>  
        ) : (
          <FlatList
            data={recipes}
            renderItem={({item})=> <RecipesCard recipe={item}/>}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={searchStyles.row} 
            contentContainerStyle={searchStyles.recipesGrid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoResultsFound/>}
          />
        )}
      </View>

    </View>
  )
}

export default searchScreen

function NoResultsFound() {
  return (
    <View style={searchStyles.emptyState}>
      <Ionicons name='search' size={64} color={COLORS.textLight}/>
      <Text style={searchStyles.emptyTitle}>No recipes found</Text>
      <Text style={searchStyles.emptyDescription}>Try a different keyword</Text>
    </View>
  );
}