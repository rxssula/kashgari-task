import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MapPin, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { SearchResponse } from "@/types/nominatim";
import { useMap } from "react-map-gl/maplibre";

interface GeocoderResult {
  placeName: string;
  center: [number, number]; // [longitude, latitude]
}

interface GeocoderInputProps {
  value?: string;
  onChange?: (location: string, coordinates?: [number, number]) => void;
  placeholder?: string;
  className?: string;
  onCoordinatesChange?: (coordinates: [number, number] | null) => void;
}

export function GeocoderInput({
  value = "",
  onChange,
  placeholder = "Search for a location...",
  className,
  onCoordinatesChange,
}: GeocoderInputProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<GeocoderResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const { myMap } = useMap();

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using Nominatim (OpenStreetMap) geocoding service - free and no API key required
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery,
        )}&limit=5&addressdetails=1`,
      );

      if (response.ok) {
        const data = (await response.json()) as SearchResponse[];
        const formattedResults: GeocoderResult[] = data.map((item) => ({
          placeName: item.display_name,
          center: [parseFloat(item.lon), parseFloat(item.lat)],
        }));
        setResults(formattedResults);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchLocations(newQuery);
    }, 300);
  };

  const handleResultSelect = (result: GeocoderResult) => {
    setQuery(result.placeName);
    setShowResults(false);
    setResults([]);

    onChange?.(result.placeName, result.center);
    onCoordinatesChange?.(result.center);
    myMap?.flyTo({ center: result.center });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          onCoordinatesChange?.(coords);

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[1]}&lon=${coords[0]}`,
            );
            if (response.ok) {
              const data = await response.json();
              const locationName = data.display_name;
              setQuery(locationName);
              onChange?.(locationName, coords);
              myMap?.flyTo({ center: coords });
            }
          } catch (error) {
            console.error("Reverse geocoding error:", error);
            setQuery(`${coords[1]}, ${coords[0]}`);
            onChange?.(`${coords[1]}, ${coords[0]}`, coords);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
        },
      );
    }
  };

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={cn("pl-10", className)}
            onFocus={() => setShowResults(results.length > 0)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="shrink-0"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleResultSelect(result)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-sm">{result.placeName}</div>
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
