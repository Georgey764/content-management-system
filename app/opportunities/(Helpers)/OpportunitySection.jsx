"use client";

import DeleteHelper from "./DeleteHelper";
import Modals from "../../ui/Components/Modals";
import { useState, useEffect } from "react";
import OpportunityCard from "../../ui/Components/OpportunityCard";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "../../ui/hooks/AuthProvider";
import SkeletonLoader from "../skeleton";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "@/components/ui/search";

export default function OpportunitySection({ searchParams }) {
  const PAGE_COUNT = 8;
  const [offset, setOffset] = useState(1);
  const supabase = createClient();
  const [opportunities, setOpportunities] = useState([]);
  const [filter, setFilter] = useState({ query: "", type: 0 });
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const value = useAuth();
  const router = useRouter();
  const [deleteHelper, setDeleteHelper] = useState({});

  function handleDeleteClick(e, id) {
    setDeleteHelper((cur) => {
      return { modal: "confirm_delete", id: id };
    });
  }

  useEffect(() => {
    const getData = async () => {
      let query = await supabase
        .from("opportunities")
        .select(
          "id, name, deadline, country, organization, type(id, type), image"
        )
        .filter("name", "ilike", "%" + filter.query + "%")
        .in("typeId", filter.type == 0 ? ["1", "2", "3", "4"] : filter.type)
        .limit(8)
        .order("id", { ascending: false });

      if (query.error) {
        alert(query.error.message);
      }
      setOpportunities([...query.data]);
      setLoading(false);
      setMoreLoading(false);
    };
    getData();
  }, [filter]);

  const loadMore = async () => {
    let query = await supabase
      .from("opportunities")
      .select(
        "id, name, deadline, country, organization, type(id, type), image"
      )
      .filter("name", "ilike", "%" + filter.query + "%")
      .in("typeId", filter.type == 0 ? ["1", "2", "3", "4"] : filter.type)
      .limit(8)
      .order("id", { ascending: false })
      .range(offset * PAGE_COUNT, offset * PAGE_COUNT + PAGE_COUNT - 1);

    if (query.error) {
      alert(query.error.message);
    }
    if (query.data.length == 0 || query.data.length < PAGE_COUNT - 1) {
      setMoreLoading(-1);
    } else {
      setMoreLoading(false);
    }
    setOpportunities([...opportunities, ...query.data]);
    setOffset((cur) => cur + 1);
  };

  function handleDeleteHelper(val) {
    setDeleteHelper(val);
  }

  return (
    <>
      <Modals searchParams={searchParams} />
      <DeleteHelper
        deleteHelper={deleteHelper}
        handleDeleteHelper={handleDeleteHelper}
      />
      <div className="mt-8 flex flex:col justify-center md:flex md:flex-row md:justify-between gap-2 flex-wrap">
        <Search
          className="w-[80vw] md:w-[300px]"
          value={filter.query}
          onChange={(e) => {
            setFilter({ ...filter, query: e.target.value });
          }}
        />
        <div className="md:flex md:flex-row gap-2 justify-start items-center flex-wrap">
          {value.role === "true" ? (
            <span>
              <Button
                onClick={(e) => {
                  router.push("/opportunities/add");
                }}
                className="w-[80vw] mr-0 md:w-[150px] md:mr-2"
              >
                Add Opportunities
              </Button>
            </span>
          ) : (
            <span></span>
          )}

          <Select
            className="inline"
            onValueChange={(e) => {
              setFilter({ ...filter, type: e });
            }}
            required
          >
            <SelectTrigger className="mt-2 md:mt-0 w-[80vw] md:w-[150px]">
              <SelectValue placeholder="Filter Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="0">
                All
              </SelectItem>
              <SelectItem value="1">Scholarship</SelectItem>
              <SelectItem value="2">Grants</SelectItem>
              <SelectItem value="3">Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="px-0 py-6 w-full mt-2 md:p-6 bg-secondary/0 rounded flex flex-row gap-2 flex-wrap justify-center relative pb-24 md:pb-24">
        {loading ? (
          <SkeletonLoader />
        ) : opportunities.length === 0 ? (
          <div>No results</div>
        ) : (
          opportunities.map((cur) => {
            return (
              <OpportunityCard
                handleDeleteClick={handleDeleteClick}
                role={value.role}
                obj={cur}
                key={cur.id}
              />
            );
          })
        )}
        {moreLoading == false ? (
          <Button
            onClick={(e) => {
              setMoreLoading(true);
              loadMore();
            }}
            className="absolute top-[calc(100%-80px)] pl-3 mt-4 bg-primary/50 text-white hover:bg-primary/70"
          >
            <ChevronDownIcon className="mr-1 h-4 w-4" />
            Show More
          </Button>
        ) : moreLoading === true ? (
          <Button className="absolute top-[calc(100%-80px)] pl-3 mt-4" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
        ) : (
          <Button
            disabled
            variant="outline"
            className="absolute top-[calc(100%-80px)] pl-3 mt-4"
          >
            No More Opportunities to Show
          </Button>
        )}
      </div>
    </>
  );
}
